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
    throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('Bob');
    myClass.addStudent(student);
    
    const result = myClass.getStudentById(0);
    
    assert.strictEqual(result, student);
    throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName('John');
    
    assert.strictEqual(student.name, 'John');
    throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    const student = new Student();
    student.setName('Alice');
    
    const name = student.getName();
    
    assert.strictEqual(name, 'Alice');
    throw new Error("Test not implemented");
});
