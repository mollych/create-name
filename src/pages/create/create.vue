<template>
	<view class="page">
		<!-- 结果区  v-if="result"-->
		<view class="result-section">
			<view class="card" v-for="(_item, index) in result" :key="index">
			  <view class="name">{{ _item.name }}</view>
			  <view class="section"><text class="label">寓意：</text>{{ _item.meaning }}</view>
			  <view class="section"><text class="label">诗词：</text>{{ _item.poem }}</view>
			   <view class="section"><text class="label">字形：</text>{{ _item.glyph }}</view>
				<view class="section"><text class="label">音律：</text>{{ _item.temperament }}</view>
				 <view class="section"><text class="label">五行：</text>{{ _item.fiveele }}</view>
				  <view class="section"><text class="label">重名率：</text>{{ _item.samerate }}</view>
			</view>
			<!-- <view class="flex-row">
			  <button size="mini" @click="generateName" class="change-btn">换一换</button>
			</view> -->
		</view>
	</view>
</template>

<script setup>
import { requestDoubao } from '@/util/api.js'
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
const result = ref(null)
// 表单数据
const formData = ref({
  surname: '',
  gender: '0',
  birthday: '',
  nameType: '3',
  tags: ''
})
onLoad((options) => {
	formData.value = JSON.parse(decodeURIComponent(options.form));
	console.log('onLoad======', formData.value)
	generateName()
})
async function generateName() {
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
</script>

<style scoped>
.page {
  padding: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
  position: relative;
  padding-bottom: 100rpx;
}
/* 结果区 */
.result-section {
  margin: 0 20rpx 20rpx;
}

.card {
  background: #fff8f8; /* #f8fdff; #fff; */
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
</style>