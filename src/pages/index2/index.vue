<template>
  <view class="page">
    <!-- 输入区 -->
    <view class="card">
      <view class="title">快速起名</view>
      <view class="item">
        <text>姓氏：</text>
        <input v-model="formData.surname" placeholder="请输入姓氏" class="input" />
      </view>
	  <view class="form-item">
	    <text class="form-label">性别</text>
		<radio-group @change="genderChange">
			<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in genderList" :key="item.value">
				<radio :value="item.value" :checked="item.value === formData.gender" />{{item.label}}
			</label>
		</radio-group>
	  </view>
	  <view class="form-item">
	    <text class="form-label">生日</text>
	    <picker mode="date" :value="formData.birthday" @change="onBirthdayChange">
	      <view class="picker-text">{{ formData.birthday || '请选择生日' }}</view>
	    </picker>
	  </view>
	  <view class="form-item">
	    <text class="form-label">名字形式</text>
	    <!-- <view class="radio-group">
	      <label class="radio-item" v-for="item in nameTypeList" :key="item.value">
	        <radio 
	          :value="item.value" 
	          :checked="formData.nameType === item.value"
	          @change="formData.nameType = item.value"
	        />{{ item.label }}
	      </label>
	    </view> -->
		<radio-group @change="nameTypeChange">
			<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in nameTypeList" :key="item.value">
				<radio :value="item.value" :checked="item.value === formData.nameType" />{{item.label}}
			</label>
		</radio-group>
	  </view>
      <button @click="generateName" type="primary" class="btn">
        立即起名
      </button>
    </view>

    <!-- 结果区 -->
	<view v-if="result">
		<view class="card" v-for="(_item, index) in result" :key="_item.value">
		  <view class="name">{{ _item.name }}</view>
		  <view class="section"><text class="label">寓意：</text>{{ _item.meaning }}</view>
		  <view class="section"><text class="label">诗词：</text>{{ _item.poem }}</view>
		   <view class="section"><text class="label">字形：</text>{{ _item.glyph }}</view>
		    <view class="section"><text class="label">音律：</text>{{ _item.temperament }}</view>
			 <view class="section"><text class="label">五行：</text>{{ _item.fiveele }}</view>
			  <view class="section"><text class="label">重名率：</text>{{ _item.samerate }}</view>
		</view>
		<view class="flex-row">
		  <button size="mini" @click="generateName">换一换</button>
		  <!-- <button size="mini" type="primary" @click="addToCompare">加入对比</button> -->
		</view>
	</view>
    

    <!-- 对比区 -->
    <view class="card" v-if="compareList.length">
      <view class="title">名字对比（{{ compareList.length }}/3）</view>
      <view v-for="(item,i) in compareList" :key="i" class="compare-item">
        {{ item.name }}｜{{ item.meaning }}
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { requestDoubao } from '@/util/api.js'

const surname = ref('')
const result = ref(null)
const compareList = ref([])
// 表单数据
const formData = ref({
  surname: '',
  gender: '0',
  birthday: '',
  nameType: '3',
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

// 生成名字
async function generateName() {
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
	  "glyph": "字形"
	  "temperament": "音律",
	  "fiveele": "五行",
	  "samerate": "重名率"
    }]
  `
  // console.log('prompt----', prompt)
  console.log('formData-----', formData.value)
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
</script>

<style scoped>
.page{padding:20rpx;}
.card{background:#fff;border-radius:16rpx;padding:30rpx;margin-bottom:20rpx;}
.title{font-size:32rpx;font-weight:500;margin-bottom:20rpx;}
.item{display:flex;align-items:center;margin-bottom:20rpx;}
.input{flex:1;border-bottom:1px solid #eee;padding:10rpx;}
.btn{margin-top:10rpx;}
.name{font-size:48rpx;color:#4e8aff;text-align:center;margin:20rpx 0;}
.section{margin:10rpx 0;line-height:1.6;}
.label{color:#4e8aff;font-weight:bold;}
.flex-row{display:flex;gap:20rpx;margin-top:20rpx;}
.compare-item{padding:10rpx;border-bottom:1px solid #eee;}
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
</style>