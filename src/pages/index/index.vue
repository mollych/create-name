<template>
  <view class="container">
	  <!-- Banner 轮播 -->
	  <swiper class="banner" indicator-dots autoplay interval="3000" duration="500">
		<swiper-item v-for="(item, index) in bannerList" :key="index">
		  <image :src="item.image" class="banner-img" mode="scaleToFill" />
		</swiper-item>
	  </swiper>

    <!-- 顶部导航栏 -->
    <!-- <view class="header">
      <view class="location">
        <text class="location-text">深圳</text>
        <text class="location-arrow">▼</text>
      </view>
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <text class="search-placeholder">搜索</text>
      </view>
      <view class="header-actions">
        <text class="header-icon">📷</text>
        <text class="header-icon">💬</text>
      </view>
    </view> -->

    <!-- 主要功能区 -->
    <view class="main-func">
      <view class="main-func-item" v-for="(item, index) in mainFuncList" :key="index">
        <text class="main-func-icon">{{ item.icon }}</text>
        <text class="main-func-text">{{ item.text }}</text>
        <text class="main-func-subtext" v-if="item.subtext">{{ item.subtext }}</text>
      </view>
    </view>

    <!-- 网格功能区 -->
    <view class="grid-func">
      <view class="grid-item" v-for="(item, index) in gridFuncList" :key="index">
        <view class="grid-icon">
          <text>{{ item.icon }}</text>
        </view>
        <text class="grid-text">{{ item.text }}</text>
      </view>
    </view>

    <!-- 标签切换 -->
    <view class="tab-wrap">
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'name' }"
        @click="activeTab = 'name'"
      >宝宝起名</view>
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'score' }"
        @click="activeTab = 'score'"
      >名字评分</view>
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'smart' }"
        @click="activeTab = 'smart'"
      >智能起名</view>
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'test' }"
        @click="activeTab = 'test'"
      >智能测名</view>
    </view>

    <!-- 起名表单 -->
    <view class="form-wrap" v-if="activeTab === 'name'">
      <view class="form-item">
        <text class="form-label">姓氏</text>
        <input class="form-input" v-model="formData.surname" placeholder="请输入姓氏" />
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
        <text class="form-label">生日</text>
        <picker mode="date" :value="formData.birthday" @change="onBirthdayChange">
          <view class="picker-text">{{ formData.birthday || '请选择生日' }}</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="form-label">名字形式</text>
        <view class="radio-group">
          <label class="radio-item" v-for="item in nameTypeList" :key="item.value">
            <radio 
              :value="item.value" 
              :checked="formData.nameType === item.value"
              @change="formData.nameType = item.value"
            />{{ item.label }}
          </label>
        </view>
      </view>
      <view class="form-item">
        <text class="form-label">期望标签</text>
        <input class="form-input" v-model="formData.tags" placeholder="性格特征、风格期望(可以不选)" />
      </view>
      <button class="submit-btn" @click="handleGenerateName">立即起名</button>
    </view>

    <!-- 起名结果展示 -->
    <view class="result-wrap" v-if="resultList.length > 0">
      <view class="result-item" v-for="(item, index) in resultList" :key="index">
        <view class="name">{{ item.name }}</view>
        <view class="meaning">寓意：{{ item.meaning }}</view>
        <view class="poem">诗词：{{ item.poem }}</view>
        <view class="action-btns">
          <button class="action-btn" @click="handleChangeAnother">换一换</button>
          <button class="action-btn" @click="handleCompare(item)">对比</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
// Banner 数据
const bannerList = ref([
  { image: '/static/3.png' },
  { image: '/static/3.png' },
])

// 主要功能数据（顶部蓝色区域）
const mainFuncList = ref([
  { icon: '📄', text: '智能起名+', subtext: '专业分析' },
  { icon: '👶', text: '宝宝起名', subtext: '精选好名' },
  { icon: '💯', text: '名字评分', subtext: '专业测评' },
  { icon: '📅', text: '黄历查询', subtext: '吉日查询' }
])

// 网格功能数据
const gridFuncList = ref([
  { icon: '👨⚕️', text: '问专家' },
  { icon: '📋', text: '起名指南' },
  { icon: '💊', text: '姓名五行' },
  { icon: '💉', text: '生肖起名' },
  { icon: '✨', text: '特殊寓意' },
  { icon: '🦷', text: '姓氏起源' },
  { icon: '📅', text: '生日分析' },
  { icon: '📊', text: '全部功能' }
])

// 标签切换
const activeTab = ref('name')

// 表单数据
const formData = reactive({
  surname: '',
  gender: 'male',
  birthday: '',
  nameType: 'double',
  tags: ''
})

// 性别选项
const genderList = ref([
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
  { label: '未出生', value: 'unknown' }
])

// 名字形式选项
const nameTypeList = ref([
  { label: '双字名', value: 'double' },
  { label: '单字名', value: 'single' },
  { label: '不限', value: 'all' }
])

// 结果数据
const resultList = ref([])

// 选择生日
const onBirthdayChange = (e) => {
  formData.birthday = e.detail.value
}

// 调用豆包 API 生成名字
const handleGenerateName = async () => {
  if (!formData.surname) {
    uni.showToast({ title: '请输入姓氏', icon: 'none' })
    return
  }
  try {
    uni.showLoading({ title: '生成中...' })
    // 调用云函数（对接豆包 API）
    const res = await uniCloud.callFunction({
      name: 'generateName',
      data: {
        ...formData,
        scene: 'basic'
      }
    })
    resultList.value = res.result.data
    uni.hideLoading()
  } catch (err) {
    uni.hideLoading()
    uni.showToast({ title: '生成失败，请重试', icon: 'none' })
  }
}

// 换一换
const handleChangeAnother = async () => {
  await handleGenerateName()
}

// 对比名字
const handleCompare = (item) => {
  uni.showToast({ title: `对比名字：${item.name}`, icon: 'none' })
  // 可跳转到对比页面或弹窗展示
}
</script>

<style scoped>
.container {
  padding: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 顶部导航栏 */
.header {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.location {
  display: flex;
  align-items: center;
  margin-right: 20rpx;
}

.location-text {
  font-size: 28rpx;
  color: #333;
}

.location-arrow {
  font-size: 20rpx;
  color: #666;
  margin-left: 5rpx;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20rpx;
  padding: 10rpx 20rpx;
}

.search-icon {
  font-size: 24rpx;
  color: #999;
  margin-right: 10rpx;
}

.search-placeholder {
  font-size: 24rpx;
  color: #999;
}

.header-actions {
  display: flex;
  align-items: center;
  margin-left: 20rpx;
}

.header-icon {
  font-size: 32rpx;
  margin-left: 20rpx;
}

/* 主要功能区 */
.main-func {
  display: flex;
  background: linear-gradient(135deg, #1e88e5 0%, #2196f3 100%);
  padding: 30rpx 20rpx;
  margin: 20rpx;
  border-radius: 15rpx;
}

.main-func-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.main-func-icon {
  font-size: 48rpx;
  margin-bottom: 10rpx;
}

.main-func-text {
  font-size: 24rpx;
  font-weight: bold;
  margin-bottom: 5rpx;
}

.main-func-subtext {
  font-size: 18rpx;
  opacity: 0.9;
}

/* 网格功能区 */
.grid-func {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20rpx;
  padding: 20rpx;
  background-color: #fff;
  margin: 0 20rpx 20rpx;
  border-radius: 15rpx;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rpx;
}

.grid-icon text {
  font-size: 36rpx;
}

.grid-text {
  font-size: 20rpx;
  color: #333;
  text-align: center;
}

/* 标签切换 */
.tab-wrap {
  display: flex;
  margin: 0 20rpx 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #666;
  background-color: #f9f9f9;
  border-bottom: 3rpx solid transparent;
}

.tab-item.active {
  color: #1e88e5;
  background-color: #fff;
  border-bottom-color: #1e88e5;
}

/* 表单区域 */
.form-wrap {
  margin: 0 20rpx 20rpx;
  background-color: #fff;
  padding: 30rpx;
  border-radius: 15rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.form-item {
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
}

.form-label {
  width: 120rpx;
  font-size: 28rpx;
  color: #333;
}

.form-input {
  flex: 1;
  border: 2rpx solid #f0f0f0;
  border-radius: 10rpx;
  padding: 20rpx;
  font-size: 28rpx;
  background-color: #f9f9f9;
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
  border: 2rpx solid #f0f0f0;
  border-radius: 10rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #999;
  background-color: #f9f9f9;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #1e88e5 0%, #2196f3 100%);
  color: #fff;
  border-radius: 10rpx;
  padding: 25rpx 0;
  font-size: 32rpx;
  font-weight: bold;
  margin-top: 20rpx;
}

/* 结果展示 */
.result-wrap {
  margin: 20rpx;
}

.result-item {
  background-color: #fff;
  border-radius: 15rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.name {
  font-size: 40rpx;
  font-weight: bold;
  color: #1e88e5;
  margin-bottom: 10rpx;
}

.meaning, .poem {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 10rpx;
  line-height: 1.5;
}

.action-btns {
  display: flex;
  gap: 20rpx;
  margin-top: 20rpx;
}

.action-btn {
  flex: 1;
  background-color: #f5f5f5;
  color: #333;
  border-radius: 8rpx;
  padding: 15rpx 0;
  font-size: 26rpx;
  border: 1rpx solid #eee;
}
.banner {
  height: 360rpx;
  width: 100%;
  margin: 0 auto;
}
.banner-img {
  width: 100%;
  height: 100%;
}
/* 响应式调整 */
@media (max-width: 375px) {
  .grid-func {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .main-func-icon {
    font-size: 40rpx;
  }
  
  .main-func-text {
    font-size: 22rpx;
  }
}
</style>