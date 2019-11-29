<<template>
    <div class="chain_wrap">
        <div class="chain_manage_title">区块链管理>交易信息</div>
        <!-- <div class="chain_info_row" style="margin-top:20px">
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
        </div> -->
        <el-table
            :data="tr_data"
            @row-click="tradeRowClick"
            border
            style="width: 100%; margin-top: 20px;"
            >
            <el-table-column
                label="时间戳"
                width="180"
                align="center">
                <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.timestamp)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="区块高度"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose">{{scope.row.hash}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="发起方"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose">{{scope.row.from}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="调用合约名称"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose">{{scope.row.contractName}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'tradeInfoList',
    data(){
        return {
            input1: '',
            tr_data: [
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    from: '北京芯际科技有限公司',
                    contractName: 'order',
                    timestamp: 1574754665,
                    status: 1,
                    content: '0x“132456454646”'
                }, 
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    from: '北京芯际科技有限公司',
                    contractName: 'order',
                    timestamp: 1574754665,
                    status: 0,
                    content: '0x“132456454646”'
                }, 
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    from: '北京芯际科技有限公司',
                    contractName: 'order',
                    timestamp: 1574754665,
                    status: 1,
                    content: '0x“132456454646”'
                }, 
            ],
        }
    },
    created(){
    },
    methods: {
        tradeInfoSearch(){

        },
        tradeRowClick(row, column, event){
            this.$store.dispatch('blockManagement/setTradeDetail', row).then(() => {
                this.$router.push({path: '/tradeDetail'})
            })          
        }
    }

    
}
</script>

<style scoped>
    .chain_wrap {
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
    .color_choose {
        color: #800080;
        /* cursor: pointer; */
    }
    .chain_manage_title{
        font-size: 20px;
        color: purple;
    }
</style>