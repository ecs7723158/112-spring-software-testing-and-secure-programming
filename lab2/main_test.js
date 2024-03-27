const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'Guan\nChen\nGala');
});

test("MailSystem write", () => {
    const mailSystem = new MailSystem();
    assert.strictEqual(mailSystem.write("Guan"), "Congrats, Guan!");
});

test("MailSystem send", () => {
    const mailSystem = new MailSystem();
    Math.random = () => 0.6;
    const context = mailSystem.write("Guan");
    assert.strictEqual(mailSystem.send("Guan", context), true);
    Math.random = () => 0.5;
    assert.strictEqual(mailSystem.send("Chen", context), false);
});

test("Application getNames", async () => {
    const application = new Application();
    const [people, selected] = await application.getNames();
    assert.deepStrictEqual(people, ["Guan", "Chen", "Gala"]);
    assert.deepStrictEqual(selected, []);
});

test("Application getRandomPerson", () => {
    const application = new Application();
    application.people = ["Guan", "Chen", "Gala"];
    Math.random = () => 0;
    assert.deepStrictEqual(application.getRandomPerson(), "Guan");
    Math.random = () => 0.6;
    assert.deepStrictEqual(application.getRandomPerson(), "Chen");
    Math.random = () => 0.9;
    assert.deepStrictEqual(application.getRandomPerson(), "Gala");
});

test("Application selectNextPerson", async () => {
    const application = new Application();
    await application.getNames();
    application.selected = ["Guan"];
    let count = 0;
    test.mock.method(application, 'getRandomPerson', () => {
        const name_list = application.people;
        if (count <= name_list.length) {
            return name_list[count++];
        }
    });
    assert.strictEqual(application.selectNextPerson(), "Chen");
    assert.strictEqual(application.selectNextPerson(), "Gala");
    assert.strictEqual(application.selectNextPerson(), null);
});

test("Application notifySelected", () => {
    const application = new Application();
    application.people = ["Guan", "Chen", "Gala"];
    application.selected = ["Guan", "Chen", "Gala"];
    application.mailSystem.write = test.mock.fn(application.mailSystem.write);
    application.mailSystem.send = test.mock.fn(application.mailSystem.send);
    application.notifySelected();
    assert.strictEqual(application.mailSystem.send.mock.calls.length, application.people.length);
    assert.strictEqual(application.mailSystem.write.mock.calls.length, application.people.length);
});
