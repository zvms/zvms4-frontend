<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElInput, ElSelect, ElOption, ElCol, ElRow, ElButton, ElCard, ElResult } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import axios from '@/plugins/axios.ts'

const options = [
  {
    value: 'oxford',
    label: 'Oxford Dictionary',
    disabled: false
  },
  {
    value: 'merriam-webster-collegiate',
    label: 'Merriam-Webster Dictionary',
    disabled: true
  },
  {
    value: 'merriam-webster-thesaurus',
    label: 'Merriam-Webster Thesaurus',
    disabled: true
  }
]

const dictionary = ref('oxford')

const search = ref('')
const incorrect = ref(false)

const wordInfos = reactive<{
  word: string
  phonetics: Array<{
    text: string
    audio: string
  }>
  meanings: Array<{
    partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'interjection'
    definitions: Array<{
      definition: string
      example: string
      synonyms: string[]
      antonyms: string[]
    }>
  }>
}[]>([])

async function searchWord() {
  if (!search.value) return
  if (dictionary.value === 'oxford') {
    incorrect.value = false
    const response = (await axios(`/plugin/dictionary/oxford/${search.value}`)).data.data
    if (Object.keys(response).includes('title') && response.title === 'No Definitions Found') {
      incorrect.value = true
      return
    }
    // Remove all of existed thing in `wordInfos`
    wordInfos.splice(0, wordInfos.length)
    // Add new word info
    wordInfos.push(...response)
  }
}
</script>

<template>
  <div>
    <div class="m-4">
      <ElRow>
        <ElCol :span="16" class="mx-4">
          <ElInput v-model="search" placeholder="Please input your word..." :prefix-icon="Search"
                   @keydown.enter="searchWord" clearable>
            <template #append>
              <ElButton @click="searchWord">Search</ElButton>
            </template>
          </ElInput>
        </ElCol>
        <ElCol :span="4" class="mx-4">
          <ElSelect v-model="dictionary">
            <ElOption v-for="item in options" :key="item.value" :value="item.value" :label="item.label" :disabled="item.disabled" />
          </ElSelect>
        </ElCol>
      </ElRow>
    </div>
    <ElResult v-if="incorrect" icon="error" title="Cannot find the word.">

    </ElResult>
    <div v-else>
      <ElCard v-for="word in wordInfos" :key="word.word" shadow="hover" class="mx-4 my-2">
        <p class="text-xl">{{ word.word }}</p>
        <div>
        <span class="mr-4" v-for="pronunciation in word.phonetics" :key="pronunciation.text">
          <span class="text-gray">{{ pronunciation.text }}</span>
          <audio v-if="pronunciation.audio" :src="pronunciation.audio" controls></audio>
        </span>
        </div>
        <ElCard v-for="meaning in word.meanings" :key="meaning.toString()" class="my-1" shadow="hover">
          Part Of Speech: <span class="font-mono">{{ meaning.partOfSpeech }}</span>
          <li v-for="item in meaning.definitions" :key="item.definition">
            <span v-if="item.definition">Definition: <span class="font-serif">{{ item.definition }}</span><br /></span>
            <span v-if="item.example">Example: <span class="font-serif">{{ item.example }}</span><br /></span>
            <span v-if="item.synonyms.length != 0">Synonyms: {{ item.synonyms.join(', ') }}<br /></span>
            <span v-if="item.antonyms.length != 0">Antonyms: {{ item.antonyms.join(', ') }}<br /></span>
          </li>
        </ElCard>
      </ElCard>
    </div>
  </div>
</template>

<style scoped>

</style>
