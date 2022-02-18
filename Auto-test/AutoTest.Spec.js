import res from 'express/lib/response';
import { Selector } from 'testcafe';

//Var
const goodUrl = 'http://www.google.com'
const urlInput = Selector('input').withAttribute('name','longUrl');
const runButton = Selector('#run');
const strResult = Selector('#result');


fixture`Getting Started`
        .page`http://localhost:8080/`
        .beforeEach(async x => {
            await x.maximizeWindow();
        });


test('Insert Good URL', async t => {
    await t.typeText(urlInput,goodUrl)
    .click(runButton);
    
    let resultStr = await strResult.innerText;
    resultStr = resultStr.substring(0,4);
    console.log(resultStr);
    await t.expect(resultStr).eql('http');

});
test('Insert Bad URL', async t => {
    await t.typeText(urlInput,"bad Url")
    .click(runButton);

    let resultStr = await strResult.innerText;
    await t.expect(resultStr).eql('invalid URL');
});
test('Insert null URL', async t => {
    await t.click(runButton);

    let resultStr = await strResult.innerText;
    await t.expect(resultStr).eql('Faild to Cut the URL');
});