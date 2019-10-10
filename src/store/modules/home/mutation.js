import {
    change_Login_Informa
} from './mutation-types'

const mutations = {

    // 切换单程往返类型
    [change_Login_Informa](state, typeVal) {
        state.loginInforma = typeVal
    }
}


export default mutations;