<<template>
    <div class="chain_wrap">
        <div class="chain_manage_title">区块链管理</div>
        <div class="chain_part">
            <div class="chain_part_item_left">
                <div class="chain_part_left_title" style="font-size: 18px">
                    主链
                </div>
            </div>

            <div class="chain_part_item">
                <div class="chain_part_item_title">
                    全节点
                </div>
                <div class="chain_part_item_img chain_part_items">
                    <div class="chain_part_text">
                    {{count}}
                    </div>
                </div>
            </div>
            <div class="chain_part_item">
                <div class="chain_part_item_title">
                    共识节点
                </div>
                <div class="chain_part_item_img_1 chain_part_items">
                    <div class="chain_part_text">
                    {{count}}
                    </div>
                </div>
            </div>
            <div class="chain_part_item">
                <div class="chain_part_item_title">
                    数据节点
                </div>
                <div class="chain_part_item_img_2 chain_part_items">
                    <div class="chain_part_text">
                    {{count}}
                    </div>
                </div>
            </div>
            <div class="chain_part_item">
                <div class="chain_part_item_title">
                   区块高度
                </div>
                <div class="chain_part_item_img_3 chain_part_items">
                    <div class="chain_part_text">
                    {{count}}
                    </div>
                </div>
            </div>
        </div>

         <div class="chain_part">
            <div class="chain_part_item_left">
                <div class="chain_part_left_title" style="font-size: 18px">
                    防伪溯源链
                </div>
            </div>

            <div class="chain_part_item">
                <div class="chain_part_item_title">
                    全节点
                </div>
                <div class="chain_part_item_img chain_part_items">
                    <div class="chain_part_text">
                    {{count}}
                    </div>
                </div>
            </div>
            <div class="chain_part_item">
                <div class="chain_part_item_title">
                    共识节点
                </div>
                <div class="chain_part_item_img_1 chain_part_items">
                    <div class="chain_part_text">
                    {{count}}
                    </div>
                </div>
            </div>
            <div class="chain_part_item">
                <div class="chain_part_item_title">
                    数据节点
                </div>
                <div class="chain_part_item_img_2 chain_part_items">
                    <div class="chain_part_text">
                    {{count}}
                    </div>
                </div>
            </div>
            <div class="chain_part_item">
                <div class="chain_part_item_title">
                   区块高度
                </div>
                <div class="chain_part_item_img_3 chain_part_items">
                    <div class="chain_part_text">
                    {{count}}
                    </div>
                </div>
            </div>
            <div class="chain_part_item">
                <div class="chain_part_item_title">
                   交易量
                </div>
                <div class="chain_part_item_img_4 chain_part_items">
                    <div class="chain_part_text">
                    {{count}}
                    </div>
                </div>
            </div>
        </div>
        <div class="chain_info_row" style="margin-top:20px">
            <div class="info_row_left">
                <div class="chain_manage_title">
                    区块信息
                </div>
                <el-button style="background-color: purple;color: #fff;margin-left: 20px; font-size:14px;font-weight:normal"
                @click="this.goMoreBlockInfo"
                >查看更多</el-button>
            </div>
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
            <div class="info_row_left">
                <div class="chain_manage_title">
                    交易信息
                </div>
                <el-button style="background-color: purple;color: #fff;margin-left: 20px; font-size:14px;font-weight:normal"
                @click="this.goMoreTradeInfo"
                >查看更多</el-button>
            </div>
            <div class="info_row_left" style="width: 500px">
                <el-input
                    size="medium"
                    placeholder="请输入交易哈希进行搜索"
                    suffix-icon="el-icon-search"
                    v-model="input2">
                </el-input>
                <el-button style="background-color: purple;color: #fff;margin-left: 20px; font-size:14px;font-weight:normal"
                @click="this.tradeInfoSearch"
                >搜索</el-button>
            </div>
        </div>
        <el-table
            :data="tr_data"
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
    name: 'blockchainManagement',
    data(){
        return {
            count: 0,
            name: '主链',
            input1: '',
            input2: '',
            tr_data: [
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    from: '北京芯际科技有限公司',
                    contractName: 'order',
                    timestamp: 1574754665
                }, 
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    from: '北京芯际科技有限公司',
                    contractName: 'order',
                    timestamp: 1574754665
                }, 
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    from: '北京芯际科技有限公司',
                    contractName: 'order',
                    timestamp: 1574754665
                }, 
            ],
            block_data:[
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    chainheight: '#200333',
                    value: 0,
                    timestamp: 1574754665
                }, 
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    chainheight: '#200333',
                    value: 0,
                    timestamp: 1574754665
                }, 
                {
                    hash: '0x8fc23823d7b6b0fb74445424e7a4bd7e68a838033009d1c953601c0ce17c128f',
                    chainheight: '#200333',
                    value: 1,
                    timestamp: 1574754665
                }, 
            ]
        }
    },
    created(){
    },
    methods: {
        goMoreBlockInfo(){
            this.$router.push({path: '/blockInfoList'})
        },
        goMoreTradeInfo(){
            this.$router.push({path: '/tradeInfoList'})
        },
        blockInfoSearch(){

        },
        tradeInfoSearch(){

        }
    }

    
}
</script>

<style scoped>
    .chain_wrap {
    }
    .chain_info{
        width: 100%;
        margin-top: 20px;
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
    .chain_part {
        width: 100%;
        display: flex;
        margin-top: 20px;
        flex-direction: row;
        align-items: center
    }
    .chain_manage_title{
        font-size: 20px;
        color: purple;
    }
    .chain_part_item_left{
        width: 160px;
        height: 160px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between
    }
    .chain_part_text {
        font-size: 20px;
        color: #fff;
    }
    .chain_part_left_title{
        width: 160px;
        text-align: left;
        font-size: 14px;
        height: 20px;
    }
    .chain_part_item_title {
        width: 120px;
        text-align: left;
        font-size: 14px;
        height: 16px;
    }
    .chain_part_item {
        width: 160px;
        height: 160px;
        padding: 16px;
        margin-left: 30px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between
    }
    .chain_part_items {
        width: 70px;
        height: 70px;
        border-radius: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
    }
    .chain_part_item_img {
        background-color: red;
    }
    .chain_part_item_img_1 {
        background-color: purple;
    }
    .chain_part_item_img_2 {
        background-color: blue;
    }
    .chain_part_item_img_3 {
        background-color: orange;
    }
    .chain_part_item_img_4 {
        background-color: pink;
    }
</style>