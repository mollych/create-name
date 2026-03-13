<template>
  <view class="page">
    <!-- 次数用完提示弹窗 -->
    <view v-if="showLimitModal" class="modal-mask" @click="showLimitModal = false">
      <view class="modal-content" @click.stop>
        <view class="modal-title">提示</view>
        <view class="modal-text">今日免费次数已用完</view>
        <view class="modal-btns">
          <button class="modal-btn cancel" @click="showLimitModal = false">明天再来</button>
          <button class="modal-btn confirm" @click="watchVideo">看视频+3次</button>
        </view>
      </view>
    </view>

    <!-- 顶部导航栏 -->
    <!-- <view class="header">
      <text class="header-title">新生儿起名工具大全</text>
      <view class="header-actions">
        <text class="header-icon">⋮</text>
        <text class="header-icon">−</text>
        <text class="header-icon">⊕</text>
      </view>
    </view> -->

    <!-- Banner -->
    <view class="banner">
      <image src="/static/1.jpg" mode="aspectFill" class="banner-img" />
    </view>

    <!-- 功能按钮区 -->
    <view class="func-buttons">
      <view class="func-item" @click="funcClick">
        <view class="func-icon blue">A+</view>
        <text class="func-text">智能起名+</text>
      </view>
      <view class="func-item" @click="funcClick">
        <view class="func-icon orange">宝</view>
        <text class="func-text">宝宝起名</text>
      </view>
      <view class="func-item" @click="funcClick">
        <view class="func-icon red">100</view>
        <text class="func-text">名字打分</text>
      </view>
      <view class="func-item" @click="funcClick">
        <view class="func-icon yellow">📅</view>
        <text class="func-text">黄历查询</text>
      </view>
    </view>

    <!-- 标签切换 -->
    <!-- <view class="tab-bar">
      <view class="tab-item active" @click="toggleModule('1')">宝宝起名</view>
      <view class="tab-item" @click="toggleModule('2')">名字评分</view>
      <view class="tab-item">智能起名</view>
      <view class="tab-item">智能测名</view>
    </view> -->

    <!-- 表单区域 -->
    <view class="form-card">
      <view class="form-row">
        <text class="form-label">姓氏</text>
        <input v-model="formData.surname" placeholder="请输入姓氏" class="form-input" />
      </view>
      
      <view class="form-row">
        <text class="form-label">性别</text>
		<radio-group @change="genderChange" class="radio-group">
			<label class="radio-item" v-for="(item, index) in genderList" :key="item.value">
				<radio :value="item.value" :checked="item.value === formData.gender" /><text>{{item.label}}</text>
			</label>
		</radio-group>
      </view>
      
      <view class="form-row">
        <text class="form-label">生日</text>
        <picker mode="date" :value="formData.birthday" @change="onBirthdayChange" class="date-picker">
          <view class="picker-content">
            <text>{{ formData.birthday || '请选择生日' }}</text>
            <text class="calendar-icon">📅</text>
          </view>
        </picker>
      </view>
      
      <view class="form-row">
        <text class="form-label">名字形式</text>
		<radio-group @change="nameTypeChange" class="radio-group">
			<label class="radio-item" v-for="(item, index) in nameTypeList" :key="item.value">
				<radio :value="item.value" :checked="item.value === formData.nameType" /><text>{{item.label}}</text>
			</label>
		</radio-group>
      </view>
      
      <!-- <view class="form-row">
        <text class="form-label">期望标签</text>
        <input v-model="formData.tags" placeholder="性格特征、风格期望(可以不选)" class="form-input" />
      </view> -->
      
      <button @click="generateName" class="submit-btn">
        立即起名
      </button>
    </view>

    <!-- 热门功能 -->
    <!-- <view class="hot-functions">
      <view class="hot-title">
        <text>热门功能</text>
      </view>
      <view class="hot-items">
        <view class="hot-item">
          <view class="hot-icon book">📚</view>
          <view class="hot-content">
            <text class="hot-item-title">智能起名+</text>
            <text class="hot-item-desc">更具现代审美标准的新生代起名方案</text>
          </view>
          <text class="hot-arrow">→</text>
        </view>
        <view class="hot-item">
          <view class="hot-icon users">👨‍👩‍👧‍👦</view>
          <view class="hot-content">
            <text class="hot-item-title">宝宝起名</text>
            <text class="hot-item-desc">姓氏+性别+生日，完美匹配100分美名</text>
          </view>
          <text class="hot-arrow">→</text>
        </view>
      </view>
    </view> -->

    <!-- 结果区 -->
	<view v-if="result" class="result-section">
		<view class="card" v-for="(_item, index) in result" :key="index">
	  <view class="name">{{ _item.name }}</view>
	  <view class="section"><text class="label">寓意：</text>{{ _item.meaning }}</view>
	  <view class="section"><text class="label">诗词：</text>{{ _item.poem }}</view>
	   <view class="section"><text class="label">字形：</text>{{ _item.glyph }}</view>
	    <view class="section"><text class="label">音律：</text>{{ _item.temperament }}</view>
		 <view class="section"><text class="label">五行：</text>{{ _item.fiveele }}</view>
		  <view class="section"><text class="label">重名率：</text>{{ _item.samerate }}</view>
	</view>
	<view class="flex-row">
	  <button size="mini" @click="generateName" class="change-btn">换一换</button>
	  <!-- <button size="mini" type="primary" @click="addToCompare">加入对比</button> -->
	</view>
	</view>
    

    <!-- 对比区 -->
   <!-- <view class="card" v-if="compareList.length">
      <view class="title">名字对比（{{ compareList.length }}/3）</view>
      <view v-for="(item,i) in compareList" :key="i" class="compare-item">
        {{ item.name }}｜{{ item.meaning }}
      </view>
    </view> -->

    <!-- 底部导航栏 -->
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { requestDoubao } from '@/util/api.js'

const result = ref(null)
const compareList = ref([])
const showLimitModal = ref(false)
// 表单数据
const formData = ref({
  surname: '',
  gender: '0',
  birthday: '',
  nameType: '3',
  tags: ''
})
// 性别选项
const genderList = ref([
  { label: '男', value: '0' },
  { label: '女', value: '1' },
  { label: '未出生', value: '2' }
])

// 名字形式选项
const nameTypeList = ref([
  { label: '双字名', value: '3' },
  { label: '单字名', value: '2' },
  { label: '不限', value: 'all' }
])

// 看视频增加次数
function watchVideo() {
  showLimitModal.value = false
  
  // 显示激励视频广告（需要配置广告位ID）
  // 这里使用模拟实现，实际需要配置微信广告组件
  // 微信小程序激励视频广告
  if (typeof uni.createRewardedVideoAd === 'function') {
    try {
      const ad = uni.createRewardedVideoAd({
        adUnitId: 'your_ad_unit_id' // 需要在微信后台配置广告位ID
      })
      ad.onLoad(() => {
        ad.show().catch(() => {
          ad.load()
        })
      })
      ad.onClose((res) => {
        if (res && res.isEnded) {
          // 视频播放完成，增加次数
          const today = new Date().toDateString()
          const usageData = uni.getStorageSync('nameGeneratorUsage') || { date: today, count: 0, bonusCount: 0 }
          usageData.bonusCount += 3
          uni.setStorageSync('nameGeneratorUsage', usageData)
          uni.showToast({ title: '获得3次免费机会', icon: 'success' })
        }
      })
      ad.onError((err) => {
        console.log('广告加载失败', err)
        // 广告失败时直接增加次数（模拟）
        addBonusCount()
      })
    } catch (e) {
      console.log('广告创建失败', e)
      // 广告创建失败时直接增加次数（模拟）
      addBonusCount()
    }
  } else {
    // 非微信小程序环境或广告不可用，直接增加次数（模拟看视频）
    addBonusCount()
  }
}

// 增加奖励次数
function addBonusCount() {
  const today = new Date().toDateString()
  const usageData = uni.getStorageSync('nameGeneratorUsage') || { date: today, count: 0, bonusCount: 0 }
  usageData.bonusCount += 3
  uni.setStorageSync('nameGeneratorUsage', usageData)
  uni.showToast({ title: '获得3次免费机会', icon: 'success' })
}

// 检查使用次数
function checkUsageLimit() {
  const today = new Date().toDateString()
  const usageData = uni.getStorageSync('nameGeneratorUsage') || { date: '', count: 0 }
  
  // 如果是新的一天，重置计数
  if (usageData.date !== today) {
    usageData.date = today
    usageData.count = 0
  }
  
  // 检查是否超过限制
  if (usageData.count >= 3) {
    uni.showToast({ icon: 'none', title: '今日免费次数已用完，请明天再来' })
    return false
  }
  
  // 增加使用次数
  usageData.count++
  uni.setStorageSync('nameGeneratorUsage', usageData)
  return true
}

// 生成名字
async function generateName() {
// 检查使用次数限制
  if (!checkUsageLimit()) return
  /* // 检查使用次数限制
  const today = new Date().toDateString()
  const usageData = uni.getStorageSync('nameGeneratorUsage') || { date: today, count: 0, bonusCount: 0 }
  
  // 如果是新的一天，重置计数
  if (usageData.date !== today) {
    usageData.date = today
    usageData.count = 0
    usageData.bonusCount = 0
  }
  
  // 调试信息
  console.log('今日日期:', today)
  console.log('存储的日期:', usageData.date)
  console.log('当前使用次数:', usageData.count)
  console.log('奖励次数:', usageData.bonusCount)
  
  // 计算剩余次数
  const remainingCount = 3 - usageData.count + usageData.bonusCount
  
  // 检查是否超过限制
  if (remainingCount <= 0) {
    showLimitModal.value = true
    return
  }
  
  // 增加使用次数
  usageData.count++
  uni.setStorageSync('nameGeneratorUsage', usageData) */
  
  if (!formData.value.surname) return uni.showToast({ icon: 'none', title: '请输入姓氏' })
  const genderName = formData.value.gender === '0' ? '男孩' : formData.value.gender === '1' ? '女孩' : ''
  const nameNum = formData.value.nameType === 'all' ? '2或3' : formData.value.nameType
  const prompt = `
    请给${formData.value.birthday ? '出生日期' + formData.value.birthday : ''}姓氏【${formData.value.surname}】起五个好听的【${genderName}】名字，${nameNum}个字。
    返回格式严格用JSON数组，不要其他内容：
    [{
      "name":"名字",
      "meaning":"寓意解析",
      "poem":"诗词溯源",
	  "glyph": "字形",
	  "temperament": "音律",
	  "fiveele": "五行",
	  "samerate": "重名率"
    }]
  `
  console.log('prompt----', prompt)
  console.log('formData-----', formData)
  uni.showLoading({
  	title: '生成中...'
  })
  // return
  let text = await requestDoubao([{ role: 'user', content: prompt }])
  // console.log('text-----', text, JSON.parse(text))
  uni.hideLoading()
  try {
    result.value = JSON.parse(text)
  } catch (e) {
	  console.log('catch e----', e)
    uni.showToast({ icon: 'none', title: '解析失败' })
  }
}

// 加入对比
function addToCompare() {
  if (compareList.value.length >= 3) return uni.showToast({ icon: 'none', title: '最多对比3个' })
  compareList.value.push(result.value)
}
// 选择生日
const onBirthdayChange = (e) => {
  formData.value.birthday = e.detail.value
}
function genderChange(evt) {
	console.log('genderChange-----', evt)
	formData.value.gender = evt.detail.value
}
function nameTypeChange(e) {
	console.log('nameTypeChange', e)
	formData.value.nameType = e.detail.value
}
function toggleModule(e) {
	console.log('toggleModule----', e)
}
function funcClick() {
	uni.showToast({
		title: '功能开发中，敬请期待...',
		icon: 'none'
	})
}
</script>

<style scoped>
/* 全局样式 */
.page {
  padding: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
  position: relative;
  padding-bottom: 100rpx;
}

/* 弹窗样式 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  width: 70%;
  max-width: 600rpx;
  text-align: center;
}

.modal-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.modal-text {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.modal-btns {
  display: flex;
  justify-content: space-around;
  gap: 20rpx;
}

.modal-btn {
  flex: 1;
  padding: 20rpx 0;
  font-size: 28rpx;
  border-radius: 8rpx;
  border: none;
}

.modal-btn.cancel {
  background-color: #f0f0f0;
  color: #666;
}

.modal-btn.confirm {
  background-color: #1a365d;
  color: #fff;
}

/* 顶部导航栏 */
.header {
  background-color: #1a365d;
  color: #fff;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-title {
  font-size: 32rpx;
  font-weight: bold;
}

.header-actions {
  display: flex;
  gap: 20rpx;
}

.header-icon {
  font-size: 28rpx;
}

/* Banner */
.banner {
  width: 100%;
  height: 300rpx;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
}

/* 功能按钮区 */
.func-buttons {
  display: flex;
  justify-content: space-around;
  padding: 30rpx 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.func-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.func-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.func-icon.blue {
  background-color: #4285f4;
  color: #fff;
}

.func-icon.orange {
  background-color: #ff9800;
  color: #fff;
}

.func-icon.red {
  background-color: #f44336;
  color: #fff;
}

.func-icon.yellow {
  background-color: #ffeb3b;
  color: #333;
}

.func-text {
  font-size: 24rpx;
  color: #333;
}

/* 标签切换 */
.tab-bar {
  display: flex;
  background-color: #fff;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #1a365d;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 60%;
  height: 4rpx;
  background-color: #1a365d;
  border-radius: 2rpx;
}

/* 表单卡片 */
.form-card {
  background-color: #fff;
  margin: 0 20rpx 20rpx;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.form-row:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.form-label {
  width: 120rpx;
  font-size: 28rpx;
  color: #333;
}

.form-input {
  flex: 1;
  border: 2rpx solid #f0f0f0;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
  background-color: #f9f9f9;
}

/* 单选框组 */
.radio-group {
  flex: 1;
  display: flex;
  gap: 40rpx;
}

.radio-item {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: #333;
}

.radio-item text {
  margin-left: 8rpx;
}

/* 日期选择器 */
.date-picker {
  flex: 1;
}

.picker-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2rpx solid #f0f0f0;
  border-radius: 8rpx;
  padding: 20rpx;
  background-color: #f9f9f9;
}

.picker-content text:first-child {
  font-size: 28rpx;
  color: #999;
}

.calendar-icon {
  font-size: 28rpx;
}

/* 提交按钮 */
.submit-btn {
  width: 100%;
  background-color: #1a365d;
  color: #fff;
  border-radius: 8rpx;
  padding: 10rpx 0;
  font-size: 32rpx;
  font-weight: bold;
  margin-top: 30rpx;
  border: none;
}

/* 热门功能 */
.hot-functions {
  margin: 0 20rpx 20rpx;
}

.hot-title {
  text-align: center;
  margin-bottom: 20rpx;
  position: relative;
}

.hot-title text {
  background-color: #f5f5f5;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #666;
  position: relative;
  z-index: 1;
}

.hot-title::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1rpx;
  background-color: #ddd;
  z-index: 0;
}

.hot-items {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.hot-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.hot-item:last-child {
  border-bottom: none;
}

.hot-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  margin-right: 20rpx;
}

.hot-icon.book {
  background-color: #e3f2fd;
}

.hot-icon.users {
  background-color: #e8f5e8;
}

.hot-content {
  flex: 1;
}

.hot-item-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 5rpx;
}

.hot-item-desc {
  font-size: 22rpx;
  color: #666;
  line-height: 1.4;
}

.hot-arrow {
  font-size: 24rpx;
  color: #999;
}

/* 结果区 */
.result-section {
  margin: 0 20rpx 20rpx;
}

.card {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.name {
  font-size: 48rpx;
  color: #1a365d;
  text-align: center;
  margin: 20rpx 0;
  font-weight: bold;
}

.section {
  margin: 10rpx 0;
  line-height: 1.6;
}

.label {
  color: #1a365d;
  font-weight: bold;
}

.flex-row {
  display: flex;
  gap: 20rpx;
  margin-top: 20rpx;
  justify-content: center;
}

.change-btn {
  padding: 15rpx 40rpx;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 8rpx;
  font-size: 26rpx;
  border: none;
}

/* 对比区 */
.compare-item {
  padding: 10rpx;
  border-bottom: 1rpx solid #eee;
}

/* 底部导航栏 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  padding: 15rpx 0;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rpx;
}

.nav-item.active {
  color: #1a365d;
}

.nav-icon {
  font-size: 32rpx;
  margin-bottom: 5rpx;
}

.nav-text {
  font-size: 20rpx;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .func-icon {
    width: 70rpx;
    height: 70rpx;
    font-size: 30rpx;
  }
  
  .form-label {
    width: 100rpx;
    font-size: 24rpx;
  }
  
  .form-input {
    font-size: 24rpx;
    padding: 15rpx;
  }
}
</style>