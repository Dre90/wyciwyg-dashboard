<template>
  <div>
    <Back :link="`/challenges/${id}`" />
    <div>
      <button
        v-if="nextPosition !== 0"
        @click="showPosition"
        class="border-2 border-bv-blue bg-bv-blue p-4 text-bv-green hover:bg-bv-hover-blue active:bg-bv-green active:text-bv-blue"
      >
        Show {{ nextPosition }} place
      </button>
    </div>
    <div class="flex w-full justify-center overflow-visible">
      <ConfettiExplosion
        v-if="visible"
        :stageWidth="1600"
        :stageHeight="1500"
        :particleCount="particles"
      />
    </div>
    <div class="stage">
      <div
        v-for="(result, index) in topThree"
        :key="index"
        class="pod"
        :class="`pod-${index + 1} ${polePosition[index + 1].join(' ')}`"
      >
        <div class="name">{{ result.name }}</div>

        <div class="pole">
          <div class="position">{{ index + 1 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ConfettiExplosion from "vue-confetti-explosion";
const { id } = useRoute().params;
const supabase = useSupabaseClient();

const polePosition = reactive({
  1: [],
  2: [],
  3: [],
});

const voteResults = ref([]);
const nextPosition = ref(3);
const visible = ref(false);
let particles = ref(100);

const topThree = computed(() => {
  return voteResults.value.slice(0, 3);
});

async function getVoteResults() {
  try {
    let { data, error, status } = await supabase
      .from("Vote")
      .select("*, Results(name)")
      .eq("challenge_id", id);

    if (error && status !== 406) throw error;

    if (data && status === 200) {
      voteResults.value = countVoteResults(data);
    }
  } catch (error) {
    alert(error.message);
  }
}

const explode = async () => {
  visible.value = false;
  await nextTick();
  visible.value = true;
  particles.value = particles.value + 50;
};

const showPosition = () => {
  const id = nextPosition.value;
  if (id < 1) {
    return;
  }

  polePosition[id].push("slidein");
  setTimeout(() => {
    polePosition[id].push("revealed");
    explode();
    /* setTimeout(() => {
      visible.value = false;
    }, 5000); */
    /* if (id == 1) {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, 5000);
    } */

    setTimeout(() => {
      polePosition[id].push("placed");
      nextPosition.value -= 1;
    }, 1000);
  }, 1000);
};

function countVoteResults(results) {
  let resultsArray = [];
  results.forEach((result) => {
    if (!resultsArray.some((e) => e.result_id === result.result_id)) {
      let object = {
        count: 1,
        result_id: result.result_id,
        name: result.Results.name,
      };
      resultsArray.push(object);
    } else {
      resultsArray.forEach((resultObject) => {
        if (resultObject.result_id === result.result_id) {
          resultObject.count++;
        }
      });
    }
  });

  resultsArray.sort(function (a, b) {
    return b.count - a.count;
  });

  return resultsArray;
}

onBeforeMount(() => {
  getVoteResults();
});

definePageMeta({
  middleware: "auth",
});
</script>

<style scoped>
.stage {
  height: 80vh;
  overflow: hidden;
}
.pod {
  display: grid;
  grid-template-rows: auto 1fr;

  width: 250px;
  height: 45vh;
  color: #fff;

  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 100%);

  transition: all ease 0.5s;
}

.pod.revealed .name {
  visibility: visible;
}

.pod .pole {
  border-radius: 5px 5px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
}
.pod .position {
  font-size: 33px;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background-color: #545ac6;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pod .name {
  text-align: center;
  font-weight: 700;
  visibility: hidden;
}

.pod-1 {
  height: 60%;
  z-index: 3;
}

.pod-1.placed {
  transform: translate(-50%, 0);
}
.pod-1 .pole {
  background-color: #f71e4d;
}
.pod-1 .name {
  font-size: 32px;
}
.pod-2 {
  height: 50%;
  z-index: 2;
}

.pod-2.placed {
  transform: translate(calc(-50% - 230px), 0);
}
.pod-2 .pole {
  background-color: #f9a86f;
}
.pod-2 .name {
  font-size: 29px;
}
.pod-3 {
  height: 45%;
  z-index: 1;
}

.pod-3.placed {
  transform: translate(calc(-50% + 230px), 0);
}
.pod-3 .pole {
  background-color: #060fbf;
}
.pod-3 .name {
  font-size: 25px;
}

.slidein {
  transform: translate(-50%, 0);
}
</style>
