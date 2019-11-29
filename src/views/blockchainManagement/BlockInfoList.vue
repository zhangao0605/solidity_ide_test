<<template>
    <div class="chain_wrap">
        <div class="chain_manage_title">区块链管理>区块信息</div>

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
                @click="this.blockInfoSearch"
                >搜索</el-button>
            </div>
        </div>
        <el-table
            :data="block_data"
            border
            @row-click="blockRowClick"
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
                <span class="to_tr color_choose">{{scope.row.chainheight}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="区块哈希"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose">{{scope.row.hash}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="交易量"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose">{{scope.row.value}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="chain_info_row" style="margin-top:20px">
            <div></div>

            <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: 'blockInfoList',
    data(){
        return {
            input1: '',
            block_data:[
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    chainheight: '#200333',
                    value: 0,
                    timestamp: 1574754665,
                    tradeList: [
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    ]
                }, 
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    chainheight: '#200333',
                    value: 0,
                    timestamp: 1574754665,
                    tradeList: [
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    ]
                }, 
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    chainheight: '#200333',
                    value: 1,
                    timestamp: 1574754665,
                    tradeList: [
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                        '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    ]
                }, 
            ]
        }
    },
    created(){
    },
    methods: {
        blockInfoSearch(){
        },
        blockRowClick(row, column, event){
            this.$store.dispatch('blockManagement/setBlockDetail', row).then(() => {
                this.$router.push({path: '/blockDetail'})
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