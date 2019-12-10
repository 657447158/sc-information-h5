import ajax from './axios'
export default {
    /**
     * [支付-输入支付密码后拿到支付凭证]
     */
    checkUserPayPassword (params) {
        return ajax({
            type: 'POST',
            url: 'app/pay/checkUserPayPassword',
            params: Object.assign({...params})
        })
    },
    /**
     * [借贷单列表]
     */
    getLoanList (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/getLoanList',
            params: Object.assign({...params})
        })
    },
    /**
     * [我要借入/出-累计]
     */
    getUserCumulative (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/getUserCumulative',
            params: Object.assign({...params})
        })
    },
    /**
     * [借贷周期]
     */
    getLoanPeriod (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/getLoanPeriod',
            params: Object.assign({...params})
        })
    },
    /**
     * [借贷单-发布参数]
     */
    publishLoanParam (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/publishLoanParam',
            params: Object.assign({...params})
        })
    },
    /**
     * [借贷单-发布操作]
     */
    publishLoan (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/publishLoan',
            params: Object.assign({...params})
        })
    },
    /**
     * [计算需要抵押的数量]
     */
    getLoanPledgeCoinNum (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/getLoanPledgeCoinNum',
            params: Object.assign({...params})
        })
    },
    /**
     * [订单-大厅-借入/借出--参数]
     */
    getLoanDetail (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/getLoanDetail',
            params: Object.assign({...params})
        })
    },
    /**
     * [订单-借入订单-操作]
     */
    borrowOrder (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/borrowOrder',
            params: Object.assign({...params})
        })
    },
    /**
     * [订单-借出订单-操作]
     */
    lendOrder (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/lendOrder',
            params: Object.assign({...params})
        })
    },
    /**
     * [订单-借入单-当前和历史]
     */
    getMyBorrowOrderList (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/getMyBorrowOrderList',
            params: Object.assign({...params})
        })
    },
    /**
     * [我的借入/出单--我发布单借贷单]
     */
    getMyPublishBorrowList (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/getMyPublishBorrowList',
            params: Object.assign({...params})
        })
    },
    /**
     * [订单-我的借入单--详情]
     */
    getMyBorrowOrderDetail (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/getMyBorrowOrderDetail',
            params: Object.assign({...params})
        })
    },
    /**
     * [订单- 我的借入单--详情-去还款]
     */
    gotoRepayment (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/gotoRepayment',
            params: Object.assign({...params})
        })
    },
    /**
     * [订单-借出单-当前和历史]
     */
    getMyLendOrderList (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/getMyLendOrderList',
            params: Object.assign({...params})
        })
    },
    /**
     * [订单-我的借出单--详情]
     */
    getMyLendOrderDetail (params) {
        return ajax({
            type: 'POST',
            url: 'api/loan/getMyLendOrderDetail',
            params: Object.assign({...params})
        })
    },
}
