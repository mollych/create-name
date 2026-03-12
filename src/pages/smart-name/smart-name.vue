<template>
  <view class="container">
    <view class="title">智能起名</view>
    <!-- 风格选择 -->
    <view class="style-wrap">
      <text class="style-label">选择风格</text>
      <view class="style-list">
        <view 
          class="style-item" 
          :class="{ active: selectedStyle === item.value }"
          v-for="item in styleList" :key="item.value"
          @click="selectedStyle = item.value"
        >{{ item.label }}</view>
      </view>
    </view>

    <!-- 详细表单 -->
    <view class="form-wrap">
      <view class="form-item">
        <text class="form-label">姓氏</text>
        <input class="form-input" v-model="formData.surname" placeholder="请输入姓氏" />
      </view>
      <view class="form-item">
        <text class="form-label">字辈</text>
        <input class="form-input" v-model="formData.generation" placeholder="请输入字辈(可选)" />
      </view>
      <view class="form-item">
        <text class="form-label">性别</text>
        <view class="radio-group">
          <label class="radio-item" v-for="item in genderList" :key="item.value">
            <radio 
              :value="item.value" 
              :checked="formData.gender === item.value"
              @change="formData.gender = item.value"
            />{{ item.label }}
          </label>
        </view>
      </view>
      <view class="form-item">
        <text class="form-label">名字字数</text>
        <view class="radio-group">
          <label class="radio-item" v-for="item in wordCountList" :key="item.value">
            <radio 
              :value="item.value" 
              :checked="formData.wordCount === item.value"
              @change="formData.wordCount = item.value"
            />{{ item.label }}
          </label>
        </view>
      </view>
      <view class="form-item">
        <text class="form-label">出生日期</text>
        <picker mode="date" :value="formData.birthday" @change="onBirthdayChange">
          <view class="picker-text">{{ formData.birthday || '请选择出生日期' }}</view>
        </picker>
      </view>
      <button class="submit-btn" @click="handleSmartGenerate">开始智能起名</button>
    </view>

    <!-- 结果展示 -->
    <view class="result-wrap" v-if="resultList.length > 0">
      <view class="result-item" v-for="(item, index) in resultList" :key="index">
        <view class="name">{{ item.name }}</view>
        <view class="meaning">寓意：{{ item.meaning }}</view>
        <view class="poem">诗词：{{ item.poem }}</view>
        <view class="source">来源：{{ item.source }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 风格选项
const styleList = ref([
  { label: '周易经典起名', value: 'zhouyi' },
  { label: '星座文化起名', value: 'constellation' },
  { label: '诗经楚辞起名', value: 'shijing' },
  { label: '出生日期起名', value: 'birthday' }
])
const selectedStyle = ref('zhouyi')

// 表单数据
const formData = reactive({
  surname: '',
  generation: '',
  gender: 'male',
  wordCount: '2',
  birthday: ''
})

// 性别选项
const genderList = ref([
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
  { label: '未出生', value: 'unknown' }
])

// 字数选项
const wordCountList = ref([
  { label: '2字', value: '2' },
  { label: '3字', value: '3' },
  { label: '不限', value: 'all' }
])

// 结果数据
const resultList = ref([])

// 选择生日
const onBirthdayChange = (e) => {
  formData.birthday = e.detail.value
}

// 智能起名调用
const handleSmartGenerate = async () => {
  if (!formData.surname) {
    uni.showToast({ title: '请输入姓氏', icon: 'none' })
    return
  }
  try {
    uni.showLoading({ title: '智能生成中...' })
    const res = await uniCloud.callFunction({
      name: 'generateName',
      data: {
        ...formData,
        style: selectedStyle.value,
        scene: 'smart'
      }
    })
    resultList.value = res.result.data
    uni.hideLoading()
  } catch (err) {
    uni.hideLoading()
    uni.showToast({ title: '生成失败，请重试', icon: 'none' })
  }
}
</script>

<style scoped>
.container {
  padding: 30rpx;
  background-color: #fff;
}
.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 40rpx;
  text-align: center;
}
.style-wrap {
  margin-bottom: 40rpx;
}
.style-label {
  font-size: 30rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}
.style-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}
.style-item {
  padding: 15rpx 25rpx;
  border: 1rpx solid #eee;
  border-radius: 30rpx;
  font-size: 26rpx;
  color: #666;
}
.style-item.active {
  background-color: #007AFF;
  color: #fff;
  border-color: #007AFF;
}
.form-wrap {
  margin-bottom: 40rpx;
}
.form-item {
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
}
.form-label {
  width: 150rpx;
  font-size: 28rpx;
  color: #333;
}
.form-input {
  flex: 1;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
}
.radio-group {
  display: flex;
  gap: 30rpx;
}
.radio-item {
  display: flex;
  align-items: center;
  font-size: 28rpx;
}
.picker-text {
  flex: 1;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #999;
}
.submit-btn {
  width: 100%;
  background-color: #002B5B;
  color: #fff;
  border-radius: 10rpx;
  padding: 25rpx 0;
  font-size: 32rpx;
  margin-top: 20rpx;
}
.result-wrap {
  margin-top: 40rpx;
}
.result-item {
  border: 1rpx solid #eee;
  border-radius: 10rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}
.name {
  font-size: 40rpx;
  font-weight: bold;
  color: #002B5B;
  margin-bottom: 10rpx;
}
.meaning, .poem, .source {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 10rpx;
}
</style>