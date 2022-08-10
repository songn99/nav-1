const $siteList = $('.siteList')
console.log($siteList)
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const objects = JSON.parse(x)
const hashMap = objects || [
    { logo: 'G', url: 'https://github.com' },
    { logo: 'B', url: 'https://baidu.com' },
    { logo: 'I', url: 'https://iconfont.cn' }
]
console.log(hashMap)
const simplify = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="url">${simplify(node.url)}</div>
                <div class="close">
                <svg class="icon">
                <use xlink:href="#icon-ai68"></use>
                </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.add-button').on('click', () => {
    let url = window.prompt('主人，你要加啥？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplify(url)[0].toUpperCase(),
        url: url
    })
    render()
})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)//可以把对象变为字符串
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
