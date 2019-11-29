<<template>
    <div class="chain_wrap">
        <div class="chain_manage_title">区块链管理>区块信息>区块详情</div>
        <div class="chain_info_row" style="margin-top:20px">
            <div></div>
            <div class="info_row_left" style="width: 500px">
                <el-input
                    size="medium"
                    placeholder="请输入区块高度/区块哈希进行搜索"
                    suffix-icon="el-icon-search"
                    v-model="input1">
                </el-input>
                <el-button style="background-color: purple;color: #fff;margin-left: 20px; font-size:14px;font-weight:normal"
                @click="this.tradeInfoSearch"
                >搜索</el-button>
            </div>
        </div>
        
        <ul class="trade_wrap">
            <li class="data_row" style="border-top: 1px solid #cccccc">
                <div class="li_left">区块高度</div>
                <div class="li_right">{{detailData.chainheight}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">时间戳</div>
                <div class="li_right">{{timestampToTime(detailData.timestamp)}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">区块hash</div>
                <div class="li_right">{{detailData.hash}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">交易数量</div>
                <div class="li_right">{{detailData.value}}</div>
            </li>
        </ul>
        <div class="data_row_list">
            <div class="left_wrap">
                <div>交易列表</div>
            </div>
            <ul class="ul_right_list">
                <li  class="li_right_list" v-for="item in detailData.tradeList" :key="item">
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'blockDetail',
    data(){
        return {
            input1: '',
            detailData: {}
        }
    },
    created() {
        this.detailData = this.$store.getters.blockDetailData
    },
    methods: {
        tradeInfoSearch(){

        },
    }

    
}
</script>

<style scoped>
    .chain_wrap {
    }
    .left_wrap{
        position: absolute;
        width: 300px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #cccccc;
        border-top-width: 0;
    }
    .data_row_list{
        width: 100%;
        position: relative;
        background-color: #ffffff;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
    }
    .ul_right_list{
        flex: 1;
        margin-left: 300px;
        max-height: 400px;
        overflow: auto
    }
    .li_right_list{
        flex: 1;
        height: 50px;
        line-height: 50px;
        text-align: center;
        vertical-align: middle;
        border: 1px solid #cccccc;
        border-top-width: 0;
        border-left-width: 0;
    }
    .img_size{
        width: 24px;
        height: 24px;
        margin-right: 5px;
    }
    .li_havimg{
        display: flex;
        align-items: center;
        justify-content: center
    }
    .li_right{
        flex: 1;
        height: 50px;
        line-height: 50px;
        text-align: center;
        vertical-align: middle;
        border: 1px solid #cccccc;
        border-left-width: 0;
        border-top-width: 0;
    }
    .li_left{
        width: 300px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        vertical-align: middle;
        border: 1px solid #cccccc;
        border-top-width: 0;
    }
    .data_row{
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .trade_wrap{
        width: 100%;
        min-height: 200px;
        margin-top: 20PX;
        background-color: #ffffff;
    }
    .info_row_left{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .chain_info_row{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .chain_manage_title{
        font-size: 20px;
        color: purple;
    }
</style>