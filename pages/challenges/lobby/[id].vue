<template>
  <div>
    <div class="mb-6 w-full">
      <NuxtLink :to="`/challenges/${id}`" class="">Back</NuxtLink>
    </div>

    <div class="mt-10 flex gap-10">
      <div class="flex w-1/4 flex-col">
        <ul>
          <li
            v-for="item in userList"
            :key="item.name"
            class="pb-3 text-2xl text-bv-green"
          >
            {{ item.name }} - {{ item.combo }}
          </li>
        </ul>
      </div>
      <div class="flex w-1/2 flex-col">
        <div v-if="!gameStarted" class="flex flex-col items-center">
          <span class="text-9xl text-bv-green">{{ gamePin }}</span>
          <p class="text-xl">Game pin</p>
        </div>
        <div v-if="gameStarted" class="flex flex-col items-center">
          <p v-if="gameStarted" class="text-9xl text-bv-green">
            {{ formatTime(counter) }}
          </p>
        </div>
      </div>
      <div class="w-1/4">
        <div v-if="!gameStarted" class="flex flex-col items-center">
          <label
            v-if="!gameStarted"
            for="timer"
            class="mb-3 text-2xl text-bv-green"
            >Timer</label
          >
          <input
            v-if="!gameStarted"
            type="number"
            name="timer"
            min="1"
            max="30"
            v-model.number="minutes"
            class="mb-4 w-32 border-2 border-bv-orange bg-bv-dark-gray text-5xl text-bv-green"
          />

          <button
            @click="startTimer"
            class="inline-flex w-full cursor-pointer items-center justify-center border-2 border-bv-orange bg-bv-orange p-4 text-lg text-bv-text-color-dark transition-all hover:bg-bv-dark-orange focus:bg-bv-dark-orange active:bg-bv-text-color-dark active:fill-bv-orange active:text-bv-orange"
          >
            Start!
          </button>
        </div>
        <div
          v-if="gameStarted"
          class="flex flex-col items-center text-bv-green"
        >
          <div class="mb-6 text-9xl">{{ highestCombo }}</div>
          <div class="text-xl">Highest combo</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const gamePin = ref("");
const gameStarted = ref(false);
const minutes = ref(15);
const timerInterval = ref("");
let counter = ref(0);
const userList = ref([]);

const formatTime = (timer) => {
  const minutes = Math.floor(timer / 60);
  const seconds = Math.floor(timer - minutes * 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const startTimer = () => {
  counter.value = minutes.value * 60;
  if (gameStarted.value) {
    return;
  }

  gameStarted.value = true;

  timerInterval.value = setInterval(() => {
    counter.value--;
    if (counter.value <= 0) {
      clearInterval(timerInterval.value);
    }
  }, 1000);
};

const { data, error } = await supabase
  .from("Challenges")
  .select("game_pin")
  .eq("author_id", user.value.id)
  .eq("id", id)
  .single();

// TODO: error handling
if (error) console.log(error.message);

if (data) gamePin.value = data.game_pin;

const highestCombo = computed(() => {
  return userList.value.reduce((acc, curr) => {
    if (curr.combo > acc) {
      return curr.combo;
    }
    return acc;
  }, 0);
});

onMounted(async () => {
  let existingData = [];
  const { data, error } = await supabase
    .from("Stats")
    .select("*")
    .eq("challenge_id", id);

  // TODO: error handling
  if (error) console.log(error.message);
  if (data) existingData = data;

  const initialUserList = existingData.map((i) => {
    return {
      name: i.name,
      combo: 0,
    };
  });

  userList.value = initialUserList;

  supabase
    .channel("*")
    .on(
      "postgres_changes",
      { event: "*", schema: "*", table: "Stats" },
      (payload) => {
        if (payload.eventType == "INSERT") {
          // Add name.
          userList.value.push({
            name: payload.new.name,
            combo: 0,
          });
        }

        if (payload.new?.challenge_id == id) {
          const user = payload.new.name;
          const value = parseInt(payload.new.value, 10);

          const updatedUserList = userList.value.map((i) => {
            if (i.name !== user) {
              return i;
            }

            return {
              name: user,
              combo: value,
            };
          });

          userList.value = updatedUserList.sort((a, b) => a.combo < b.combo);
        }
      }
    )
    .subscribe();
});

definePageMeta({
  middleware: "auth",
});
</script>
