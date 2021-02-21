<template>
  <div>
    <van-divider content-position="left">{{currentChart}}</van-divider>
    <div class="asset-statistics" style="padding:0 15px">
        <div class="asset-count-chart">
            <div class="months">
                <div class="w-1-6 text-center" v-for="(cv,index) in countVal" :key="cv.date" @click="getMonth($event)" :class="{active:index === 0}">{{cv.date}}</div>
            </div>
            <div class="chart-panel vertical">
                <div class="chart-value no-flex">
                    <span class="chart-num">{{chartNum || 0}}</span><span
                        class="num2">{{currentState === 1 ? '元' : '件'}}</span>
                </div>
                <canvas id="chart" height="120"></canvas>
                <div class="chart-btns no-flex">
                    <button class="chart-btn active" @click="getState(1,$event)">金额</button>
                    <button class="chart-btn" @click="getState(0,$event)">数量</button>
                </div>
            </div>
        </div>
        
    </div>
    <div style="padding:15px 15px 0 15px">
    <ul class="home_line">
        <li>
        <img src="../assets/index/Oval.png" alt="">
        <div>
            <span>资产总{{getStateStr()}}</span>
            <span class="right">{{currentState === 0 ? '' : '￥'}}{{countStatus.total || 0}}</span>
            <van-progress color="#67E8BF" :percentage="100" stroke-width="5"/>
        </div>
        </li>
        <li>
        <img src="../assets/index/Oval1.png" alt="">
        <div>
            <span>正常资产{{getStateStr()}}</span>
            <span class="right">{{currentState === 0 ? '' : '￥'}}{{countStatus.normal}}</span>
            <van-progress color="#3284FF" :percentage="countStatus.normalPercent" stroke-width="5"/>
        </div>
        </li>
        <li>
        <img src="../assets/index/Oval2.png" alt="">
        <div>
            <span>报废资产{{getStateStr()}}</span>
            <span class="right">{{currentState === 0 ? '' : '￥'}}{{countStatus.scrapCount}}</span>
            <van-progress color="#EC5959" :percentage="countStatus.scrapPercent" stroke-width="5"/>
        </div>
        </li>
        <li>
        <img src="../assets/index/Oval3.png" alt="">
        <div>
            <span>报修资产{{getStateStr()}}</span>
            <span class="right">{{currentState === 0 ? '' : '￥'}}{{countStatus.repairCount}}</span>
            <van-progress color="#FFAF3B" :percentage="countStatus.repairPercent" stroke-width="5"/>
        </div>
        </li>
        <li>
        <img src="../assets/index/Oval4.png" alt="">
        <div>
            <span>在用资产{{getStateStr()}}</span>
            <span class="right">{{currentState === 0 ? '' : '￥'}}{{countStatus.useCount}}</span>
            <van-progress color="#A954EC" :percentage="countStatus.usePercent" stroke-width="5"/>
        </div>
        </li>
        <li>
        <img src="../assets/index/Oval5.png" alt="">
        <div>
            <span>闲置资产{{getStateStr()}}</span>
            <span class="right">{{currentState === 0 ? '' : '￥'}}{{countStatus.idleCount}}</span>
            <van-progress color="#D7618B" :percentage="countStatus.idlePercent" stroke-width="5"/>
        </div>
        </li>
    </ul>
    </div>
</div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
        // 数量汇总
        countStatus: {
          usePercent: 0,
          scrapPercent: 0,
          repairPercent: 0,
          idlePercent: 0,
          normalPercent: 0,

          total: 0,
          normal: 0,
          useCount: 0,
          scrapCount: 0,
          repairCount: 0,
          idleCount: 0
        },
        // 查询类型
        currentState:1,
        countVal: {},
        dataArr: [],
        chartNum: 0,
        currentChart: '',

    };
  },
  watch: {},
  computed: {
      isManager(){
          return this.$store.state.user.isManager
      }
  },
  methods: {
    queryData(type,state){
      let _this=this;
      let params = {
          page: 1,
          limit: 6,
          state: state
      }
      if (type === 1) {
          _this.$api.article.queryDataByIndex(params).then(res=> {
              _this.setChartData(res.data, state)
              _this.$toast.clear()
          })
      } else {
          _this.$api.article.queryEmployeeDataByIndex(params).then(res=> {
              _this.setChartData(res.data, state)
              _this.$toast.clear()
          })
      }
    },
    getMonth(e) {
        e.preventDefault();
        var tar = e.currentTarget;
        $(tar).addClass('active').siblings().removeClass('active');
        var index = $(tar).index();
        $('.chart-num').text(this.dataArr[index]);
        this.chartNum = this.dataArr[index];
        updateChartCanvas(this.dataArr, index);
    },
    /**设置图表的数据 */
    setChartData(res, state) {
        var _this = this;
        if (res.status === 1) {
            /**设置曲线图的数据 */
            if (state === 0) {
                _this.countVal = res.data.countList;
                _this.dataArr = res.data.countList.map(function (item) {
                    return item.num;
                })
                _this.countStatus.total = res.data.totalCount;
                _this.countStatus.normal = res.data.normalCount;
                _this.countStatus.useCount = res.data.useCount;
                _this.countStatus.scrapCount = res.data.scrapCount;
                _this.countStatus.repairCount = res.data.repairCount;
                _this.countStatus.idleCount = res.data.idleCount;
            } else {
                _this.countVal = res.data.valList;
                _this.dataArr = res.data.valList.map(function (item) {
                    return item.totalVal;
                })
                _this.countStatus.total = res.data.totalVal;
                _this.countStatus.normal = res.data.normalVal;
                _this.countStatus.useCount = res.data.useVal;
                _this.countStatus.scrapCount = res.data.scrapVal;
                _this.countStatus.repairCount = res.data.repairVal;
                _this.countStatus.idleCount = res.data.idleVal;
            }
            if (_this.dataArr.length === 0) {
                // $('.chart-num').text(0);
            } else {
                _this.chartNum = _this.dataArr[0];
                // $('.chart-num').text(_this.dataArr[0]);
            }

            /**设置柱状图的数据 */
            _this.countStatus.usePercent = res.data.usePercent ? Number(res.data.usePercent).toFixed(1) : 0;
            _this.countStatus.scrapPercent = res.data.scrapPercent ? Number(res.data.scrapPercent).toFixed(1) : 0;
            _this.countStatus.repairPercent = res.data.repairPercent ? Number(res.data.repairPercent).toFixed(1) : 0;
            _this.countStatus.idlePercent = res.data.idlePercent ? Number(res.data.idlePercent).toFixed(1) : 0;
            _this.countStatus.normalPercent = res.data.normalPercent ? Number(res.data.normalPercent).toFixed(1) : 0;

            updateChartCanvas(_this.dataArr, 0);
           

            this.$nextTick(function () {
                $('.months>div:first-child').addClass('active').siblings().removeClass('active');
            })

        }
    },
    getStateStr() {
        return ['数', '金额'][this.currentState];
    },
     getState(state,e) {
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
       e.preventDefault();
        var tar = e.currentTarget;
        $(tar).addClass('active').siblings().removeClass('active');
        this.currentState = state;
        if (this.currentChart === '全部资产') {
            this.queryData(1, state);
        } else {
            this.queryData(0, state);
        }
    },
    queryRecentMenu(){
      let _this=this;
      let params={
        page:1,
        limit:4,
        state:0
      }
      _this.$api.article.queryRecentMenu(params).then(res=> {
            // 执行某些操作    
          _this.recentMenu=res.data.data  
         
      }).catch((data) => console.log(data));  
    },
    onClickLeft(){
      this.$router.push({ path:'apps'}) 
    },
    onClickRight(){

    }
  },
  created(){
    this.currentChart = this.isManager ? '全部资产' : '我的资产';
    this.queryData(this.isManager, 1);
  },
  mounted() {}
};
function updateChartCanvas(data, selectedIndex) {
    var chart = $('#chart');
    var width = chart.width();
    var height = chart.height();
    chart.prop({
        width: width,
        height: height
    });
    var maxValue = Math.max(...data);
    var minValue = Math.min(...data);
    var gap = (width / 12);

    var canvas = chart[0];
    var context = canvas.getContext('2d');
    context.strokeStyle = 'white';
    context.fillStyle = '#FCB500';
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(gap, getRelativeValue(data[0]));
    for (var i = 1; i < data.length; i++) {
        context.bezierCurveTo(
            gap * i * 2,
            getRelativeValue(data[i - 1]),
            gap * i * 2,
            getRelativeValue(data[i]),
            gap * (i * 2 + 1),
            getRelativeValue(data[i]));
    }
    context.stroke();

    context.lineWidth = 3;
    context.beginPath();
    context.arc(gap * (selectedIndex * 2 + 1), getRelativeValue(data[selectedIndex]), 4, 0, 2 * Math.PI);
    context.stroke();
    context.fill();

    function getRelativeValue(num) {
        var unit = (height - 20) / (maxValue - minValue);
        return height - 10 - ((num - minValue) * unit);
    }
}
</script>
<style>
  /* chart */
  .asset-count-text {
        margin-top: 25px;
        font-size: 20px;
        color: black;
        font-weight: bold;
        margin-bottom:10px;
    }
    
    .asset-count-text>img {
        width: 11px;
        object-fit: cover;
    }
    
    .asset-count-chart {
        height: 280px;
        background: linear-gradient(317deg, #09C48B 0%, #67E8BF 100%);
        border-radius: 15px;
        position: relative;
        width: 100%;
        z-index: 2;
    }
    
    .months {
        height: 80%;
    }
    
    .months>div {
        height: 100%;
        color: white;
        font-size: 14px;
        padding-top: 15px;
        display: inline-block;
        width: 16.66%;
        text-align: center;
    }
    
    .months>div.active {
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.37), rgba(255, 255, 255, 0.03));
    }
    
    .chart-panel {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding-top: 49px;
        z-index: -1;
    }
    
    .chart-value {
        font-size: 20px;
        color: white;
        padding-left: 20px;
        padding-top: 21px;
        border-top: 1px solid rgba(255, 255, 255, .08);
    }
    
    .chart-num {
        font-size: 32px;
        font-weight: bold;
        margin-right: .1rem;
    }
    
    .chart-num {
        font-weight: bold;
    }
    
    #chart {
        width: 100%;
        height: 120px;
    }
    
    .chart-btns {
        padding: 12px 20px;
        border-top: 1px solid rgba(255, 255, 255, .08);
    }
    
    .chart-btn {
        border: none;
        background: none;
        color: white;
        font-size: 14px;
        width: 85px;
        height: 25px;
        text-align: center;
        border-radius: 17px;
    }
    
    .chart-btn.active {
        background: rgba(255, 255, 255, 0.35);
    }
</style>