const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
test.mock.method(fs, 'readFile', (file, options, callback) => {
  callback(null, 'Shan\nChen\nGala');
});
const { Application, MailSystem } = require('./main');

// Test MailSystem's write
test("Test MailSystem's write", () => {
    const myClass = new MailSystem()
    assert.strictEqual(myClass.write("Shan"), "Congrats, Shan!")
});

// Test MailSystem's send(name, context)
test("Test MailSystem's send(name, context)", () => {
    Math.random = () => 0.6
    const mailSystem = new MailSystem()
    const context = mailSystem.write("Shan")
    const success = mailSystem.send("Shan", context)
    assert.strictEqual(success, true)
    Math.random = () => 0.5
    assert.strictEqual(mailSystem.send("Chen", context), false)
});

// Test Application's getNames
test("Test Application's getNames", async () => {
    const application = new Application
    const [people, selected] = await application.getNames()
    assert.deepStrictEqual(people, ["Shan", "Chen", "Gala"])
    assert.deepStrictEqual(selected, [])
});

// Test Application's getRandomPerson()
test("Test Application's getRandomPerson()", () => {
    const application = new Application
    application.people = ["Shan", "Chen", "Gala"]
    Math.random = () => 0
    assert.deepStrictEqual(application.getRandomPerson(), "Shan");
    Math.random = () => 0.6
    assert.deepStrictEqual(application.getRandomPerson(), "Chen");
    Math.random = () => 0.9
    assert.deepStrictEqual(application.getRandomPerson(), "Gala");
});

// Test Application's selectNextPerson
test("Test Application's selectNextPerson", async() => {
    const application = new Application
    const name_list = await application.getNames();
    application.selected = ["Shan"]
    let count = 0;
    test.mock.method(application, 'getRandomPerson', () => {
        if (count <= name_list.length) { 
            return name_list[0][count++]; 
        }
    });
    assert.strictEqual(application.selectNextPerson(), "Chen")
    assert.strictEqual(application.selectNextPerson(), "Gala")
    assert.strictEqual(application.selectNextPerson(), null)
});

// Test Application's notifySelected()
test("Test Application's notifySelected()", () => {
    const application = new Application  
    application.people = ["Shan", "Chen", "Gala"]
    application.selected = ["Shan", "Chen", "Gala"]
    application.mailSystem.write = test.mock.fn(application.mailSystem.write)
    application.mailSystem.send = test.mock.fn(application.mailSystem.send)
    application.notifySelected()
    assert.strictEqual(application.mailSystem.send.mock.calls.length, application.people.length);
    assert.strictEqual(application.mailSystem.write.mock.calls.length, application.people.length); 
});
