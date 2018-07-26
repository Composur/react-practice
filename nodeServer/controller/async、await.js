function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('sleep for ' + ms + ' ms');
        }, ms);
    });
}

async function asyncFunction() {
    console.time('asyncFunction total executing:');
    const sleep1 = await sleep(2000); //2秒后执行下面的console(他需要执行完毕，下面的代码才能执行)
    console.log('2秒后:'  + sleep1);
    const [sleep2, sleep3, sleep4]= await Promise.all([sleep(2000), sleep(1000), sleep(1500)]);//同理2秒后执行下面的console，看谁最慢，执行时间是最慢的那一个
    console.log('再2s后')
    console.log('sleep2: ' + sleep2);
    console.log('sleep3: ' + sleep3);
    console.log('sleep4: ' + sleep4);
    const sleepRace = await Promise.race([sleep(3000), sleep(1000), sleep(1000)]);//比谁最快
    console.log('再1s后')
    console.log('sleep race: ' + sleepRace);
    console.timeEnd('asyncFunction total executing:');
    console.log('理论耗时5s')
    
    return 'asyncFunction done.'  // 这个可以不返回，这里只是做个标记，为了显示流程
}
asyncFunction().then(data => {
    console.log(data);       // asyncFunction return 的内容在这里获取
}).catch(error => {
    console.log(error);      // asyncFunction 的错误统一在这里抓取
});

console.log('start');
