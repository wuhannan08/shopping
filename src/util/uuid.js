/* 
    生成UUID的工具方法
*/
import { v4 as uuidv4 } from 'uuid';
export function getUUID() {
    let uuid = localStorage.getItem('UUID');
    // 如果没有uuid就生成
    if (!uuid) {
        uuid = uuidv4();
        localStorage.setItem('UUID', uuid);
    }
    return uuid;
}