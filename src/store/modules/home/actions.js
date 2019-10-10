//-------------------------------  航班查询单程或往返 ---------------------------------------//
//切换航班类型
export const changeLoginInforma = ({ commit }, typeVal) => {
    commit('change_Login_Informa', typeVal)
}