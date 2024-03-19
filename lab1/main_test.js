const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('Alice');

    const result = myClass.addStudent(student);

    assert.strictEqual(result, 0);
    assert.strictEqual(myClass.students.length, 1);
});

test("Test MyClass's addStudent with invalid student", () => {
    const myClass = new MyClass();
    const result = myClass.addStudent({});
    assert.strictEqual(result, -1);
    assert.strictEqual(myClass.students.length, 0);
});

test("Test MyClass's getStudentById with valid id", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('Bob');
    myClass.addStudent(student);

    const result = myClass.getStudentById(0);

    assert.strictEqual(result, student);
});

test("Test MyClass's getStudentById with invalid id", () => {
    const myClass = new MyClass();
    const result = myClass.getStudentById(0);
    assert.strictEqual(result, null);
});

test("Test MyClass's getStudentById with negative id", () => {
    const myClass = new MyClass();
    const result = myClass.getStudentById(-1);
    assert.strictEqual(result, null);
});

test("Test MyClass's getStudentById with id beyond length", () => {
    const myClass = new MyClass();
    const result = myClass.getStudentById(1);
    assert.strictEqual(result, null);
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName('John');
    assert.strictEqual(student.name, 'John');
});

test("Test Student's setName with invalid input", () => {
    const student = new Student();
    student.setName(123); // Passing invalid input
    assert.strictEqual(student.name, undefined);
});

test("Test Student's getName when name is set", () => {
    const student = new Student();
    student.setName('Alice');
    const name = student.getName();
    assert.strictEqual(name, 'Alice');
});

test("Test Student's getName when name is not set", () => {
    const student = new Student();
    const name = student.getName();
    assert.strictEqual(name, '');
});
