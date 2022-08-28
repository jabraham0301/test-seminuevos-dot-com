const puppeteer=require('puppeteer')
const fs=require('fs')

const insertPost=(price,description)=>{
    return new Promise(async (resolve,reject)=>{
        const browser=await puppeteer.launch();
        const page=await browser.newPage();
        await page.goto('https://www.seminuevos.com/')
        await page.$eval('a.login-btn',form=>form.click())
        await page.waitForSelector('input[name=setEmail]')
        await page.type('input[name=setEmail]',process.env.ACCOUNT_EMAIL)
        await page.waitForSelector('input[name=setPassword]')
        await page.type('input[name=setPassword]',process.env.ACCOUNT_PASSWORD)
        await page.$eval('button.input__submit.false',button=>button.click())
        await page.waitForNavigation()
        await page.goto('https://www.seminuevos.com/wizard?f_dealer_id=-1')
        await page.waitForSelector('input#input_precio')
        await page.type('input#input_precio',price.toString())
        setTimeout(async()=>await page.click('button.next-button'),2500)
        '20000'.split('').map(async digit=>setTimeout(async()=>await page.type('#input_recorrido',digit),1000))
        let inputs=[
            {
                key:2,
                type:'brands',
                selection:1
            },
            {
                key:3,
                type:'models',
                selection:2
            },
            {
                key:4,
                selection:4,
                type:'subtypes'
            },
            {
                key:5,
                selection:6,
                type:'years'
            },
            {
                key:6,
                selection:19,
                type:'provinces'
            },
            {
                key:7,
                selection:52,
                type:'cities'
            }
        ]
        for(let input of inputs){
            setTimeout(async()=>{
                let element=await page.$(`#wizard > div > div > div.wizard-content > div > div > div > div:nth-child(1) > div.card-content > div > div:nth-child(${input.key}) > div > a.latam-dropdown-button.btn.z-depth-0.truncate.placeholder.hide-on-small-and-down`)
                await page.evaluate(el=>el.click(),element)
                await page.waitForSelector(`#dropdown_${input.type} > div > div > ul > li:nth-child(${input.selection}) > a`)
                await page.$eval(`#dropdown_${input.type} > div > div > ul > li:nth-child(${input.selection}) > a`,el=>el.click())
            },1000)
        }
        await page.waitForSelector('#input_text_area_review')
        await page.type('#input_text_area_review',description)
        setTimeout(async()=>{
            const [fileChoose]=await Promise.all([
                page.waitForFileChooser(),
                page.click('#Uploader')
            ])
            await fileChoose.accept(['static/test1.png','static/test2.png','static/test3.png'])
            setTimeout(async()=>{
                await page.waitForSelector('#wizard > div > div > div.footer-fixed > div > div.footer-button.footer-column > button:nth-child(2)')
                await page.click('#wizard > div > div > div.footer-fixed > div > div.footer-button.footer-column > button:nth-child(2)')
                browser.close()
                resolve()
            },1000)
        },3000)
    })
}

const takePhoto=async()=>{
    const browser=await puppeteer.launch();
    const page=await browser.newPage();
    await page.goto('https://www.seminuevos.com/')
    await page.$eval('a.login-btn',form=>form.click())
    await page.waitForSelector('input[name=setEmail]')
    await page.type('input[name=setEmail]',process.env.ACCOUNT_EMAIL)
    await page.waitForSelector('input[name=setPassword]')
    await page.type('input[name=setPassword]',process.env.ACCOUNT_PASSWORD)
    await page.$eval('button.input__submit.false',button=>button.click())
    await page.waitForNavigation()
    const url=await page.$eval('#login-bar',el=>el.getAttribute('data-tablerourl'))
    await page.goto(`https://www.seminuevos.com${url}`)
    await page.goto('https://www.seminuevos.com/my_vehicles/pending?dealer_id=0')
    let element=await page.$('#main > div.row-fluid > div > div.search-results > ul > li:nth-child(2)')
    if(fs.existsSync('../static/post.png')){
        fs.unlinkSync('../static/post.png')
    }
    await element.screenshot({path:'static/post.png'})
    await browser.close()
}

module.exports={
    insertPost:(price,description)=>{
        return new Promise((resolve,reject)=>{
            insertPost(price,description).then(async()=>{
                await takePhoto()
                resolve()
            })
        })
    }
}