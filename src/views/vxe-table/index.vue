<!-- vxe-table插件简单使用 -->
<template>
  <div class="main-div">
    <div class="item">
      <aside>
        <a href="https://vxetable.cn/v3/#/table/start/install" target="_blank">
          {{ $t('vxeTablePage.text1') }}
        </a>
      </aside>
    </div>
    <div class="item">
      <aside>
        {{ $t('vxeTablePage.text2') }}
      </aside>
      <vxe-button :content="$t('vxeTablePage.text2')" @click="confirmEvent" />
    </div>
    <div class="item">
      <aside>
        {{ $t('vxeTablePage.text3') }}
      </aside>
      <vxe-button :content="$t('vxeTablePage.text4')" @click="openAlert({ content: $t('vxeTablePage.text4'), maskClosable: true })" />
      <vxe-button :content="$t('vxeTablePage.text5')" @click="openAlert({ content: $t('vxeTablePage.text5'), escClosable: true })" />
      <vxe-button :content="$t('vxeTablePage.text6')" @click="openAlert({ content: $t('vxeTablePage.text6'), mask: false })" />
    </div>
    <div class="item">
      <aside>
        {{ $t('vxeTablePage.text7') }}
      </aside>
      <vxe-button :content="$t('vxeTablePage.text7')" @click="openAlert({ content: $t('vxeTablePage.text7'), lockView: false, mask: false })" />
    </div>
    <div class="item">
      <aside>
        {{ $t('vxeTablePage.text8') }}
      </aside>
      <vxe-button :content="$t('vxeTablePage.text8')" @click="val1 = true" />
      <vxe-button :content="$t('vxeTablePage.text9')" @click="val12 = true" />
      <vxe-modal v-model="val1" :title="$t('vxeTablePage.text8')" width="600" height="400" show-zoom resize fullscreen>
        <template #default>
          <div style="color: red">red</div>
          <div style="color: red">red！！！！！！！！！！！！！！！</div>
          <div style="color: blue">blue！！！！！！！！！！！！！！！</div>
          <div style="color: red">red！！！！！！！！！！！！！！！</div>
          <div style="color: blue">blue！！！！！！！！！！！！！！！</div>
          <div style="color: blue">blue ！！！！！！！！！！！！！！！</div>
          <div style="color: blue">blue！！！！！！！！！！！！！！！</div>
        </template>
      </vxe-modal>

      <vxe-modal v-model="val12" :title="$t('vxeTablePage.text9')" width="600" height="400" show-zoom resize>
        <template #default>
          <div style="color: red">red</div>
          <div style="color: red">red！！！！！！！！！！！！！！！</div>
          <div style="color: blue">blue！！！！！！！！！！！！！！！</div>
          <div style="color: red">red！！！！！！！！！！！！！！！</div>
          <div style="color: blue">blue！！！！！！！！！！！！！！！</div>
          <div style="color: blue">blue ！！！！！！！！！！！！！！！</div>
          <div style="color: blue">blue！！！！！！！！！！！！！！！</div>
        </template>
      </vxe-modal>
    </div>
    <div class="item">
      <aside>
        {{ $t('vxeTablePage.text10') }}
      </aside>
      <vxe-table
        ref="xTable2"
        border
        show-overflow
        show-header-overflow
        show-footer-overflow
        show-footer
        max-height="600"
        :sort-config="{trigger: 'cell'}"
        :footer-method="footerMethod"
        :scroll-x="{gt: 100}"
        :scroll-y="{gt: 100}"
      >
        <vxe-column type="seq" width="100" />
        <vxe-column field="name" title="Name" width="150" sortable />
        <vxe-column field="sex" title="Sex" width="100" />
        <vxe-column field="age" title="Age" width="100" />
        <vxe-column field="num" title="Num" width="100" />
        <vxe-column field="num2" title="Num2" width="100" />
        <vxe-column field="attr19" title="Name" width="150" sortable />
        <vxe-column field="attr18" title="Sex" width="100" />
        <vxe-column field="attr17" title="Age" width="100" />
        <vxe-column field="date3" title="Date" width="200" show-overflow />
        <vxe-column field="role" title="Role" width="100" />
        <vxe-column field="attr16" title="Age" width="100" />
        <vxe-column field="attr15" title="Num2" width="100" />
        <vxe-column field="attr14" title="Sex" width="100" />
        <vxe-column field="attr13" title="Name" width="150" sortable />
        <vxe-column field="attr12" title="Sex" width="100" />
        <vxe-column field="attr11" title="Age" width="100" />
        <vxe-column field="attr1" title="Num" width="100" />
        <vxe-column field="address" title="Address" width="200" show-overflow />
        <vxe-column field="attr2" title="Role" width="100" />
        <vxe-column field="attr3" title="Age" width="100" />
        <vxe-column field="attr4" title="Num2" width="100" />
        <vxe-column field="attr5" title="Rate" width="100" />
        <vxe-column field="attr6" title="Name" width="150" sortable />
        <vxe-column field="attr7" title="Date" width="200" show-overflow />
        <vxe-column field="attr8" title="Role" width="100" />
        <vxe-column field="attr9" title="Num" width="100" />
        <vxe-column field="attr10" title="Address" width="200" show-overflow />
      </vxe-table>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { VXETable } from 'vxe-table'
import XEUtils from 'xe-utils'
export default {
// 组件名称
  name: 'VxeTableIndex',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 父组件传递值
  props: {
  },
  data() {
    // 这里存放数据
    return {
      val1: false,
      val12: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 生成表格测试数据
    this.$nextTick(() => {
      const $table = this.$refs.xTable2
      this.mockList(500).then(data => {
        if ($table) {
          $table.loadData(data)
        }
      })
    })
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  // 方法集合
  methods: {
    async confirmEvent() {
      const type = await VXETable.modal.confirm('您确定要删除吗？')
      VXETable.modal.message({ content: `点击了 ${type}` })
    },
    openAlert(options) {
      VXETable.modal.alert(options)
    },
    /**
     * 生成表格测试数据
     * @param {*} size 生成数量
     */
    mockList(size) {
      return new Promise(resolve => {
        const list = []
        for (let index = 0; index < size; index++) {
          list.push({
            name: `名称${index}`,
            sex: '0',
            num: 123,
            age: 18,
            num2: 234,
            rate: 3,
            address: 'shenzhen'
          })
        }
        resolve(list)
      })
    },
    footerMethod({ columns, data }) {
      // 返回一个二维数组的表尾合计
      console.log(data.length)
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          switch (column.property) {
            case 'age':
            case 'rate':
            case 'num':
            case 'num2':
              return parseInt(XEUtils.mean(data, column.property))
          }
          return '无'
        })
      ]
    }

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
/**scoped 表示样式只在当前组件有效*/
//@import url(); 引入公共css类

.main-div {
padding: 10px;
}
.item{
  margin-bottom: 40px;
}
</style>
