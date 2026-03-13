<template>
  <view class="page">
    <view class="card">
      <view class="title">智能定制起名</view>

      <view class="item">
        <text>起名风格：</text>
        <picker :range="styles">
          <view class="picker">{{ styles[style] }}</view>
        </picker>
      </view>

      <view class="item">
        <text>姓氏：</text>
        <input v-model="form.surname" placeholder="请输入姓氏" class="input" />
      </view>

      <view class="item">
        <text>字辈（可选）：</text>
        <input v-model="form.generation" placeholder="可不填" class="input" />
      </view>

      <view class="item">
        <text>性别：</text>
        <picker :range="genders">
          <view class="picker">{{ genders[form.gender] }}</view>
        </picker>
      </view>

      <view class="item">
        <text>字数：</text>
        <picker :range="lengths">
          <view class="picker">{{ lengths[form.length] }}</view>
        </picker>
      </view>

      <button @click="generate" type="primary" class="btn">
        生成名字
      </button>
    </view>

    <!-- 结果 -->
    <view class="card" v-if="result">
      <view class="name">{{ result.name }}</view>
      <view class="section"><text class="label">风格：</text>{{ styles[style] }}</view>
      <view class="section"><text class="label">解析：</text>{{ result.desc }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { requestDoubao } from '@/util/api.js'

const styles = ['周易经典', '星座文化', '诗经楚辞', '出生日期']
const genders = ['男', '女']
const lengths = ['2字', '3字']

const style = ref(0)
const form = ref({
  surname: '',
  generation: '',
  gender: 0,
  length: 1
})
const result = ref(null)

async function generate() {
  if (!form.value.surname) return uni.showToast({ icon: 'none', title: '请输入姓氏' })
  
  const prompt = `
    请按照【${styles[style.value]}】风格起名。
    姓氏：${form.value.surname}
    字辈：${form.value.generation || '无'}
    性别：${genders[form.value.gender]}
    字数：${lengths[form.value.length]}
    严格返回JSON格式，不要多余内容：
    {
      "name":"全名",
      "desc":"详细寓意解析"
    }
  `
  
  const text = await requestDoubao([{ role: 'user', content: prompt }])
  try {
    result.value = JSON.parse(text)
  } catch (e) {
    uni.showToast({ icon: 'none', title: '生成失败' })
  }
}
</script>

<style scoped>
.page{padding:20rpx;}
.card{background:#fff;border-radius:16rpx;padding:30rpx;}
.title{font-size:32rpx;margin-bottom:20rpx;}
.item{display:flex;align-items:center;margin-bottom:24rpx;}
.input{flex:1;border-bottom:1px solid #eee;padding:10rpx;}
.picker{flex:1;padding:10rpx;color:#333;}
.btn{margin-top:20rpx;}
.name{font-size:44rpx;color:#4e8aff;text-align:center;margin:20rpx 0;}
.section{margin:10rpx 0;}
.label{color:#4e8aff;}
</style>