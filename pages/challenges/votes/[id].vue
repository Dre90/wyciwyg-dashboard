<template>
  <div>
    <Back :link="`/challenges/${id}`" />

    <div v-if="!voteResults.length">
      <p class="text-6xl text-bv-green">
        There are no votes yet on this challenge
      </p>
    </div>

    <div v-else class="flex justify-center gap-5 p-5">
      <ul>
        <li
          v-for="(result, index) in voteResults"
          :key="index"
          class="flex border-2 border-bv-orange text-4xl text-bv-green"
        >
          <div class="flex-none border-r-2 border-bv-orange px-8 py-6">
            {{ index + 1 }}. place
          </div>
          <div class="grow border-r-2 border-bv-orange px-8 py-6">
            {{ result.name }}
            <span class="text-sm">({{ result.result_id }})</span>
          </div>
          <div class="flex flex-none justify-center px-8 py-6">
            {{ result.count }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const supabase = useSupabaseClient();
const voteResults = ref([]);

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

onMounted(async () => {
  getVoteResults();
});
</script>
