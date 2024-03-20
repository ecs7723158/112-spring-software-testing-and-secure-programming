const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

test('MailSystem write', async (t) => {
    const MSw = new MailSystem();
    const MSwName = 'Eric';

    const context = MSw.write(MSwName);
    assert.strictEqual(context, 'Congrats, Eric!', 'Error Name');

    const contextNull = MSw.write(null);
    assert.strictEqual(contextNull, 'Congrats, null!', 'Error null');

    const contextNumber = MSw.write(111);
    assert.strictEqual(contextNumber, 'Congrats, 111!', 'Error 111');
});

test('MailSystem send', async (t) => {
    const MSs = new MailSystem();
    const MSsName = 'Eric';

    const randomStub1 = t.stub(Math, 'random').returns(1);
    let sendmail = MSs.send(MSsName, 'mail context');
    assert.strictEqual(sendmail, true, 'random => 1 should be send');
    randomStub1.restore();

    const randomStub2 = t.stub(Math, 'random').returns(0.2);
    sendmail = MSs.send(MSsName, 'mail context');
    assert.strictEqual(sendmail, false, 'random => 0.2 shouldn\'t be send');
    randomStub2.restore();
});

test("Application getNames()", async (t) => {
    const nameList = ['A', 'B', 'C'];
    const app = new Application();
    app.people = nameList;
    app.selected = [];
    await app.getNames(); // Wait for getNames() to complete
    assert.deepStrictEqual(app.people, nameList);
    assert.deepStrictEqual(app.selected, []);
});

test("Application getRandomPerson()", async (t) => {
    const app = new Application();
    const names = ['A', 'B', 'C'];
    app.people = names;

    const randomStub1 = t.stub(Math, 'random').returns(0);
    assert.strictEqual(app.getRandomPerson(), 'A');
    randomStub1.restore();

    const randomStub2 = t.stub(Math, 'random').returns(0.4);
    assert.strictEqual(app.getRandomPerson(), 'B');
    randomStub2.restore();

    const randomStub3 = t.stub(Math, 'random').returns(0.7);
    assert.strictEqual(app.getRandomPerson(), 'C');
    randomStub3.restore();
});

test("Application selectNextPerson()", async (t) => {
    const app = new Application();
    const names = ['A', 'B', 'C'];
    app.people = names;

    // Ensure coverage for all branches
    for (let i = 0; i < app.people.length; i++) {
        app.selected.push(app.people[i]);
    }

    assert.strictEqual(app.selectNextPerson(), null);
});

test("Application notifySelected()", async (t) => {
    const app = new Application();
    const names = ['A', 'B', 'C'];
    app.people = names;
    app.selected = ['A', 'B', 'C'];
    app.mailSystem.send = t.mock.fn(app.mailSystem.send);
    app.mailSystem.write = t.mock.fn(app.mailSystem.write);
    app.notifySelected();

    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);
});
