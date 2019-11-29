<<template>
    <div class="chain_wrap">
        <div class="chain_manage_title">区块链管理>交易信息>交易详情</div>
        <div class="chain_info_row" style="margin-top:20px">
            <div></div>
            <div class="info_row_left" style="width: 500px">
                <el-input
                    size="medium"
                    placeholder="请输入交易哈希进行搜索"
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
                <div class="li_left">交易哈希</div>
                <div class="li_right">{{detailData.hash}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">时间戳</div>
                <div class="li_right">{{timestampToTime(detailData.timestamp)}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">状态</div>
                <div v-show="detailData.status==1"  class="li_right li_havimg"><img class="img_size" src="../../assets/image/trade_suc.png"/>交易成功</div>
                <div v-show="detailData.status==0"  class="li_right li_havimg"><img class="img_size" src="../../assets/image/trade_failed.png"/>交易失败</div>
            </li>
            <li class="data_row">
                <div class="li_left">发出者</div>
                <div class="li_right">{{detailData.from}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">调用合约</div>
                <div class="li_right">{{detailData.contractName}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">交易内容</div>
                <div class="li_right">{{detailData.content}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'tradeDetail',
    data(){
        return {
            input1: '',
            detailData: {}
        }
    },
    created() {
        this.detailData = this.$store.getters.tradeDetailData
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
        height: 300px;
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