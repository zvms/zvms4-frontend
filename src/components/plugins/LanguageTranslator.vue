<script setup lang="ts">
import { ref } from 'vue'
import { ElSelect, ElOption, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import axios from '@/plugins/axios.ts'

const engine = ref<'deepl' | 'google' | 'baidu' | 'youdao'>('deepl')

const engines = [
  { value: 'deepl', label: 'DeepL' },
  { value: 'google', label: 'Google', disabled: true },
  { value: 'baidu', label: 'Baidu', disabled: true },
  { value: 'youdao', label: 'Youdao', disabled: true }
]

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Chinese', value: 'zh' },
  { label: 'French', value: 'fr' }
]

const targetLanguage = ref('en')

const source = ref('')
const target = ref([])

async function translate() {
  const result = (await axios(`/plugin/translate/deepl?text=${source.value}&lang=${targetLanguage.value}`)).data.data

  target.value.splice(0, target.value.length)

  target.value.push(...result.alternatives)
}
</script>

<template>
  <div>
    <ElForm label-position="right" label-width="144px" class="m-8 py-2">
      <ElFormItem label="Engine">
        <ElSelect v-model="engine" placeholder="Select a translation engine" class="w-full">
          <ElOption v-for="item in engines" :key="item.value" :label="item.label" :value="item.value"
                    :disabled="item.disabled" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Source Text">
        <ElInput type="textarea" :autosize="{ minRows: 2 }" v-model="source" />
      </ElFormItem>
      <ElFormItem label="Target Language">
        <ElSelect placeholder="Select a target language" class="w-full" v-model="targetLanguage">
          <ElOption v-for="item in languages" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem style="text-align: right">
        <div style="text-align: right">
          <ElButton text bg @click="translate">Translate</ElButton>
        </div>
      </ElFormItem>
      <ElFormItem label="Target">
        <p v-for="item in target" :key="item" class="font-serif">{{ item }}</p>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped>

</style>
