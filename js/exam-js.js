// Initialize EmailJS
emailjs.init("5sTyfkAKeN2LX2Ehy");

const TEACHER_EMAIL = "omkarcomps11@gmail.com";

let currentLanguage = '';
let currentTest = 0;
let currentQuestion = 0;
let userAnswers = [];
let testPassword = '';
let studentData = {};
let timeRemaining = 3600;
let timerInterval;
let totalQuestions = 0;
let isReviewMode = false;
let testResults = null;

const questionBank = {
    'C': {
        1: [
            { q: "Which of the following is a valid variable name?", options: ["2value", "value-2", "_value2", "value 2"], correct: 2, topic: "Keywords, Variables, Data Types" },
            { q: "Which symbol is used for single line comments?", options: ["//", "/*", "#", "##"], correct: 0, topic: "comments" },
            { q: "Which function is used to take formatted input?", options: ["printf()", "cin", "scanf()", "gets()"], correct: 2, topic: "input/output" },
            { q: "Which header file is needed for printf?", options: ["iostream", "stdio.h", "string.h", "math.h"], correct: 1, topic: "input/output" },
            { q: "What does '&' represent in scanf?", options: ["Reference", "Address", "Pointer", "Variable"], correct: 1, topic: "input/output" },
            { q: "Size of int in most 32-bit compilers is", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], correct: 2, topic: "basics" },
            { q: "What will printf(\"%d\", 'A'); output?", options: ["A", "65", "Error", "ASCII"], correct: 1, topic: "input/output" },
            { q: "Result of 5 > 3 && 2 > 4 is", options: ["true", "false", "1", "0"], correct: 3, topic: "operators" },
            { q: "How many case labels can be inside switch?", options: ["Only 5", "Only 10", "Depends on compiler", "As many as needed"], correct: 3, topic: "if, if-else, switch-case" },
            { q: "Which data type is NOT allowed in switch expression?", options: ["int", "char", "float", "short"], correct: 2, topic: "if, if-else, switch-case" },
            { q: "Which loop executes at least once?", options: ["for", "while", "do-while", "none"], correct: 2, topic: "if, if-else, switch-case" },
            {
                q: `Output of code:

int i = 1;
while(i < 1){
    printf("Hello");
}`,
                options: [
                    "Hello printed once",
                    "Hello infinite",
                    "No output",
                    "Compilation error"
                ],
                correct: 2,
                topic: "loops"
            },
            { q: "continue statement does", options: ["terminates loop completely", "skips current iteration", "stops program", "does nothing"], correct: 1, topic: "break / continue" },
            { q: "Which is true about functions?", options: ["Always return value", "Never return value", "May or may not return value", "Must take arguments"], correct: 2, topic: "functions" },
            { q: "Array index in C starts from", options: ["−1", "0", "1", "depends on compiler"], correct: 1, topic: "Array" },
            { q: "Which declaration is correct?", options: ["int a[] = {1,2,3};", "int a[3] = {1,2,3};", "Both A & B", "None"], correct: 2, topic: "Array" },
            { q: "Which is wrong variable declaration?", options: ["int _a;", "float 1a;", "char name;", "int marks_1;"], correct: 1, topic: "Keywords, Variables, Data Types" },
{
    q: "Which statement is true about Scanner object?",
    options: [
        "It can read input from keyboard",
        "It can only read integers",
        "It is used for output",
        "It does not require import"
    ],
    correct: 0,
    topic: "Scanner/Input"
},
            { q: "Number of elements in int a[3][4];", options: ["7", "12", "3", "4"], correct: 1, topic: "Array" },
            { q: "Which access is correct?", options: ["a[2,3]", "a(2)(3)", "a[2][3]", "a<2><3>"], correct: 2, topic: "Array" },
            { q: "Function is a block of code that", options: ["runs automatically", "performs a specific task", "replaces main()", "compiles program"], correct: 1, topic: "Function" },
            {
                q: `Output of code:

#include <stdio.h>
int main() {
    int i = 5;
    do{
        printf("%d", i);
        i--;
    }while(i > 5);

    return 0;
    }`,
                options: [
                    "No output",
                    "54321",
                    "5",
                    "Infinite loop"
                ],
                correct: 2,
                topic: "loops"
            },
            {
                q: `Output of code:

#include <stdio.h>
int main() {
    int i;
    for(i = 1; i <= 5; i++){
        if(i == 3)
            break;
        printf("%d", i);
    }

    return 0;
    }`,
                options: [
                    "123",
                    "12",
                    "3",
                    "None"
                ],
                correct: 1,
                topic: "loops"
            },
            {
                q: `Output of code:

#include <stdio.h>
int main() {
    int a[] = {1,2,3,4};
    printf("%d", a[2]);

   return 0;
    }`,
                options: [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                correct: 2,
                topic: "Array"
            },
            { q: "How many values can a function return directly?", options: ["0", "1", "2", "many"], correct: 1, topic: "functions" }
        ],
        2: [
            { q: "What is a pointer?", options: ["Variable storing address", "Data type", "Function", "Loop"], correct: 0, topic: "advanced" },
            { q: "Dynamic memory allocation uses?", options: ["malloc()", "alloc()", "new()", "create()"], correct: 0, topic: "advanced" },
            { q: "Which operator is used to dereference?", options: ["&", "*", "->", "::"], correct: 1, topic: "advanced" },
            { q: "What is memory leak?", options: ["Unused allocated memory", "Stack overflow", "Syntax error", "Runtime error"], correct: 0, topic: "advanced" },
            { q: "Array indexing starts from?", options: ["1", "0", "-1", "Depends"], correct: 1, topic: "advanced" }
        ],
        3: [
            { q: "How to pass array to function?", options: ["By value", "By reference", "Both", "Cannot pass"], correct: 1, topic: "methods" },
            { q: "What is recursion?", options: ["Function calling itself", "Loop", "Pointer", "Array"], correct: 0, topic: "methods" },
            { q: "Function return type void means?", options: ["Returns nothing", "Returns 0", "Error", "Invalid"], correct: 0, topic: "methods" },
            { q: "What is function prototype?", options: ["Function declaration", "Function definition", "Function call", "Function pointer"], correct: 0, topic: "methods" },
            { q: "Call by value means?", options: ["Copy of variable", "Address passed", "Reference passed", "None"], correct: 0, topic: "methods" }
        ],
        4: [
            { q: "Does C support OOP?", options: ["Yes, fully", "No, procedural", "Partially", "Depends"], correct: 1, topic: "oop" },
            { q: "Structure in C uses keyword?", options: ["class", "struct", "object", "type"], correct: 1, topic: "oop" },
            { q: "Can struct have functions in C?", options: ["Yes", "No", "Only pointers", "Only static"], correct: 1, topic: "oop" },
            { q: "What is typedef used for?", options: ["Creating alias", "Defining functions", "Memory allocation", "Type conversion"], correct: 0, topic: "oop" },
            { q: "Union vs Structure difference?", options: ["Memory sharing", "Syntax", "Keywords", "No difference"], correct: 0, topic: "oop" }
        ]
    },

    'C++': {
        1: [
            { q: "Which of the following is a valid variable name?", options: ["2value", "value-2", "_value2", "value 2"], correct: 2, topic: "Keywords, Variables, Data Types" },
            { q: "Which symbol is used for single line comments?", options: ["//", "/*", "#", "##"], correct: 0, topic: "comments" },
            { q: "Which function is used to take formatted input?", options: ["printf()", "cin", "scanf()", "gets()"], correct: 2, topic: "input/output" },
            { q: "Which header file is needed for printf?", options: ["iostream", "stdio.h", "string.h", "math.h"], correct: 1, topic: "input/output" },
            { q: "What does '&' represent in scanf?", options: ["Reference", "Address", "Pointer", "Variable"], correct: 1, topic: "input/output" },
            { q: "Size of int in most 32-bit compilers is", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], correct: 2, topic: "basics" },
            { q: "What will printf(\"%d\", 'A'); output?", options: ["A", "65", "Error", "ASCII"], correct: 1, topic: "input/output" },
            { q: "Result of 5 > 3 && 2 > 4 is", options: ["true", "false", "1", "0"], correct: 3, topic: "operators" },
            { q: "How many case labels can be inside switch?", options: ["Only 5", "Only 10", "Depends on compiler", "As many as needed"], correct: 3, topic: "if, if-else, switch-case" },
            { q: "Which data type is NOT allowed in switch expression?", options: ["int", "char", "float", "short"], correct: 2, topic: "if, if-else, switch-case" },
            { q: "Which loop executes at least once?", options: ["for", "while", "do-while", "none"], correct: 2, topic: "if, if-else, switch-case" },
            {
                q: `Output of code:

int i = 1;
while(i < 1){
    printf("Hello");
}`,
                options: [
                    "Hello printed once",
                    "Hello infinite",
                    "No output",
                    "Compilation error"
                ],
                correct: 2,
                topic: "loops"
            },
            { q: "continue statement does", options: ["terminates loop completely", "skips current iteration", "stops program", "does nothing"], correct: 1, topic: "break / continue" },
            { q: "Which is true about functions?", options: ["Always return value", "Never return value", "May or may not return value", "Must take arguments"], correct: 2, topic: "functions" },
            { q: "Array index in C starts from", options: ["−1", "0", "1", "depends on compiler"], correct: 1, topic: "Array" },
            { q: "Which declaration is correct?", options: ["int a[] = {1,2,3};", "int a[3] = {1,2,3};", "Both A & B", "None"], correct: 2, topic: "Array" },
            { q: "Which is wrong variable declaration?", options: ["int _a;", "float 1a;", "char name;", "int marks_1;"], correct: 1, topic: "Keywords, Variables, Data Types" },
            { q: "What is value of expression: 5 + 2 * 3?", options: ["21", "17", "11", "7"], correct: 2, topic: "basic Maths" },
            { q: "Number of elements in int a[3][4];", options: ["7", "12", "3", "4"], correct: 1, topic: "Array" },
            { q: "Which access is correct?", options: ["a[2,3]", "a(2)(3)", "a[2][3]", "a<2><3>"], correct: 2, topic: "Array" },
            { q: "Function is a block of code that", options: ["runs automatically", "performs a specific task", "replaces main()", "compiles program"], correct: 1, topic: "Function" },
            {
                q: `Output of code:

#include <stdio.h>
int main() {
    int i = 5;
    do{
        printf("%d", i);
        i--;
    }while(i > 5);

    return 0;
    }`,
                options: [
                    "No output",
                    "54321",
                    "5",
                    "Infinite loop"
                ],
                correct: 2,
                topic: "loops"
            },
            {
                q: `Output of code:

#include <stdio.h>
int main() {
    int i;
    for(i = 1; i <= 5; i++){
        if(i == 3)
            break;
        printf("%d", i);
    }

    return 0;
    }`,
                options: [
                    "123",
                    "12",
                    "3",
                    "None"
                ],
                correct: 1,
                topic: "loops"
            },
            {
                q: `Output of code:

#include <stdio.h>
int main() {
    int a[] = {1,2,3,4};
    printf("%d", a[2]);

   return 0;
    }`,
                options: [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                correct: 2,
                topic: "Array"
            },
            { q: "How many values can a function return directly?", options: ["0", "1", "2", "many"], correct: 1, topic: "functions" }
        ],
        2: [
            { q: "What is a pointer?", options: ["Variable storing address", "Data type", "Function", "Loop"], correct: 0, topic: "advanced" },
            { q: "Dynamic memory allocation uses?", options: ["malloc()", "alloc()", "new()", "create()"], correct: 0, topic: "advanced" },
            { q: "Which operator is used to dereference?", options: ["&", "*", "->", "::"], correct: 1, topic: "advanced" },
            { q: "What is memory leak?", options: ["Unused allocated memory", "Stack overflow", "Syntax error", "Runtime error"], correct: 0, topic: "advanced" },
            { q: "Array indexing starts from?", options: ["1", "0", "-1", "Depends"], correct: 1, topic: "advanced" }
        ],
        3: [
            { q: "How to pass array to function?", options: ["By value", "By reference", "Both", "Cannot pass"], correct: 1, topic: "methods" },
            { q: "What is recursion?", options: ["Function calling itself", "Loop", "Pointer", "Array"], correct: 0, topic: "methods" },
            { q: "Function return type void means?", options: ["Returns nothing", "Returns 0", "Error", "Invalid"], correct: 0, topic: "methods" },
            { q: "What is function prototype?", options: ["Function declaration", "Function definition", "Function call", "Function pointer"], correct: 0, topic: "methods" },
            { q: "Call by value means?", options: ["Copy of variable", "Address passed", "Reference passed", "None"], correct: 0, topic: "methods" }
        ],
        4: [
            { q: "Does C support OOP?", options: ["Yes, fully", "No, procedural", "Partially", "Depends"], correct: 1, topic: "oop" },
            { q: "Structure in C uses keyword?", options: ["class", "struct", "object", "type"], correct: 1, topic: "oop" },
            { q: "Can struct have functions in C?", options: ["Yes", "No", "Only pointers", "Only static"], correct: 1, topic: "oop" },
            { q: "What is typedef used for?", options: ["Creating alias", "Defining functions", "Memory allocation", "Type conversion"], correct: 0, topic: "oop" },
            { q: "Union vs Structure difference?", options: ["Memory sharing", "Syntax", "Keywords", "No difference"], correct: 0, topic: "oop" }
        ]
    },

    'Java': {
        1: [
            { q: "Which of the following is NOT a Java primitive data type?", options: ["int", "float", "String", "boolean"], correct: 2, topic: "Keywords, Variables, Data Types" },
            { q: "Which symbol is used for single line comments?", options: ["//", "/*", "#", "##"], correct: 0, topic: "comments" },
            { q: "Which method is the entry point of a Java program?", options: ["start()", "main()", "run()", "begin()"], correct: 1, topic: "basics" },
            { q: "In if condition, expression must return:", options: ["int", "char", "boolean", "float"], correct: 2, topic: "if / else" },
            { q: "How many times will this loop execute? for(int i = 1; i < 4; i++) { }", options: ["2", "3", "4", "5"], correct: 1, topic: "loops" },
            { q: "Which loop is best when the number of iterations is known?", options: ["while", "do–while", "for", "none"], correct: 2, topic: "loops" },
            { q: "Which of the following creates an infinite loop?", options: ["for(int i=0; i<5; i++)", "while(i<5)", "while(true)", "do{ }while(false)"], correct: 2, topic: "loops" },
            {
                q: `Output of code:

for(int i = 1; i <= 5; i = i + 2){
    System.out.print(i + " ");
}`,
                options: [
                    "1 2 3 4 5",
                    "1 3 5",
                    "2 4",
                    "1 2 4"
                ],
                correct: 1,
                topic: "loops"
            },
            { q: "Which loop executes at least once?", options: ["for loop", "while loop", "do–while loop", "none"], correct: 2, topic: "loops" },
            { q: "Which of the following is a valid variable name in Java?", options: ["2value", "value#2", "_value2", "value-2"], correct: 2, topic: "keyword, variable , data type" },
            { q: "Which of the following is true about methods?", options: ["A method must always return a value", "A method can take parameters", "A method cannot be called", "Methods cannot be reused"], correct: 1, topic: "methods" },
            {
                q: `Output of code:

int i = 5;
do{
    System.out.print(i);
    i--;
}while(i > 5);`,
                options: [
                    "nothing",
                    "54321",
                    "5",
                    "infinite loop"
                ],
                correct: 2,
                topic: "loops"
            },
            { q: "continue statement does", options: ["terminates loop completely", "skips current iteration", "stops program", "does nothing"], correct: 1, topic: "break / continue" },
            { q: "Which of the following is correct method syntax?", options: ["method void test(){}", "void test(){}", "test() void{}", "static void test(){}"], correct: 3, topic: "methods" },
            { q: "What is value of expression: 5 + 2 * 3?", options: ["21", "17", "11", "7"], correct: 2, topic: "basic Maths" },
            { q: "Which operator is used for assignment in Java?", options: ["==", "=", ":=", "=>"], correct: 1, topic: "Operators" },
            {
                q: `Identify the error:

int sum(int a, int b){
    System.out.println(a + b);
}`,
                options: [
                    "Missing return statement",
                    "Missing parameter",
                    "No error",
                    "Cannot print sum"
                ],
                correct: 0,
                topic: "functions"
            },
            { q: "What is value of expression: 5 + 2 * 3?", options: ["21", "17", "11", "7"], correct: 2, topic: "basic Maths" },
            { q: "Which of the following is NOT a loop?", options: ["for", "while", "do-while", "if"], correct: 3, topic: "loops" },
            { q: "Which data type is used for decimal values?", options: ["int", "float", "char", "boolean"], correct: 1, topic: "Data Types" },
            { q: "Method is a block of code that", options: ["runs automatically", "performs a specific task", "replaces main()", "compiles program"], correct: 1, topic: "methods" },
            {
                q: `Output of code:

int i = 1;
while(i <= 3){
    System.out.print(i);
    i--;
}`,
                options: [
                    "123",
                    "111",
                    "infinite loop",
                    "1"
                ],
                correct: 2,
                topic: "loops"
            },
            {
                q: `Output of code:

int sum = 0;
for(int i = 1; i <= 3; i++){
    sum += i;
}
System.out.println(sum);`,
                options: [
                    "3",
                    "4",
                    "5",
                    "6"
                ],
                correct: 3,
                topic: "loops"
            },
 {
    q: `Output of code:

for(int i = 1; i <= 5; i++){
    if(i == 3)
        continue;
    System.out.print(i);
}`,
    options: [
        "12345",
        "1234",
        "1245",
        "135"
    ],
    correct: 2,
    topic: "loops"
},
            { q: "How many values can a method return directly?", options: ["0", "1", "2", "many"], correct: 1, topic: "methods" }
        ],
        2: [
            { q: "What is a pointer?", options: ["Variable storing address", "Data type", "Function", "Loop"], correct: 0, topic: "advanced" },
            { q: "Dynamic memory allocation uses?", options: ["malloc()", "alloc()", "new()", "create()"], correct: 0, topic: "advanced" },
            { q: "Which operator is used to dereference?", options: ["&", "*", "->", "::"], correct: 1, topic: "advanced" },
            { q: "What is memory leak?", options: ["Unused allocated memory", "Stack overflow", "Syntax error", "Runtime error"], correct: 0, topic: "advanced" },
            { q: "Array indexing starts from?", options: ["1", "0", "-1", "Depends"], correct: 1, topic: "advanced" }
        ],
        3: [
            { q: "How to pass array to function?", options: ["By value", "By reference", "Both", "Cannot pass"], correct: 1, topic: "methods" },
            { q: "What is recursion?", options: ["Function calling itself", "Loop", "Pointer", "Array"], correct: 0, topic: "methods" },
            { q: "Function return type void means?", options: ["Returns nothing", "Returns 0", "Error", "Invalid"], correct: 0, topic: "methods" },
            { q: "What is function prototype?", options: ["Function declaration", "Function definition", "Function call", "Function pointer"], correct: 0, topic: "methods" },
            { q: "Call by value means?", options: ["Copy of variable", "Address passed", "Reference passed", "None"], correct: 0, topic: "methods" }
        ],
        4: [
            { q: "Does C support OOP?", options: ["Yes, fully", "No, procedural", "Partially", "Depends"], correct: 1, topic: "oop" },
            { q: "Structure in C uses keyword?", options: ["class", "struct", "object", "type"], correct: 1, topic: "oop" },
            { q: "Can struct have functions in C?", options: ["Yes", "No", "Only pointers", "Only static"], correct: 1, topic: "oop" },
            { q: "What is typedef used for?", options: ["Creating alias", "Defining functions", "Memory allocation", "Type conversion"], correct: 0, topic: "oop" },
            { q: "Union vs Structure difference?", options: ["Memory sharing", "Syntax", "Keywords", "No difference"], correct: 0, topic: "oop" }
        ]
    },

    'Python': {
        1: [
            { q: "Which of the following is a valid variable name?", options: ["2value", "value-2", "_value2", "value 2"], correct: 2, topic: "Keywords, Variables, Data Types" },
            { q: "Which symbol is used for single line comments?", options: ["//", "/*", "#", "##"], correct: 0, topic: "comments" },
            { q: "Which function is used to take formatted input?", options: ["printf()", "cin", "scanf()", "gets()"], correct: 2, topic: "input/output" },
            { q: "Which header file is needed for printf?", options: ["iostream", "stdio.h", "string.h", "math.h"], correct: 1, topic: "input/output" },
            { q: "What does '&' represent in scanf?", options: ["Reference", "Address", "Pointer", "Variable"], correct: 1, topic: "input/output" },
            { q: "Size of int in most 32-bit compilers is", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], correct: 2, topic: "basics" },
            { q: "What will printf(\"%d\", 'A'); output?", options: ["A", "65", "Error", "ASCII"], correct: 1, topic: "input/output" },
            { q: "Result of 5 > 3 && 2 > 4 is", options: ["true", "false", "1", "0"], correct: 3, topic: "operators" },
            { q: "How many case labels can be inside switch?", options: ["Only 5", "Only 10", "Depends on compiler", "As many as needed"], correct: 3, topic: "if, if-else, switch-case" },
            { q: "Which data type is NOT allowed in switch expression?", options: ["int", "char", "float", "short"], correct: 2, topic: "if, if-else, switch-case" },
            { q: "Which loop executes at least once?", options: ["for", "while", "do-while", "none"], correct: 2, topic: "if, if-else, switch-case" },
            {
                q: `Output of code:

int i = 1;
while(i < 1){
    printf("Hello");
}`,
                options: [
                    "Hello printed once",
                    "Hello infinite",
                    "No output",
                    "Compilation error"
                ],
                correct: 2,
                topic: "loops"
            },
            { q: "continue statement does", options: ["terminates loop completely", "skips current iteration", "stops program", "does nothing"], correct: 1, topic: "break / continue" },
            { q: "Which is true about functions?", options: ["Always return value", "Never return value", "May or may not return value", "Must take arguments"], correct: 2, topic: "functions" },
            { q: "Array index in C starts from", options: ["−1", "0", "1", "depends on compiler"], correct: 1, topic: "Array" },
            { q: "Which declaration is correct?", options: ["int a[] = {1,2,3};", "int a[3] = {1,2,3};", "Both A & B", "None"], correct: 2, topic: "Array" },
            { q: "Which is wrong variable declaration?", options: ["int _a;", "float 1a;", "char name;", "int marks_1;"], correct: 1, topic: "Keywords, Variables, Data Types" },
            { q: "What is value of expression: 5 + 2 * 3?", options: ["21", "17", "11", "7"], correct: 2, topic: "basic Maths" },
            { q: "Number of elements in int a[3][4];", options: ["7", "12", "3", "4"], correct: 1, topic: "Array" },
            { q: "Which access is correct?", options: ["a[2,3]", "a(2)(3)", "a[2][3]", "a<2><3>"], correct: 2, topic: "Array" },
            { q: "Function is a block of code that", options: ["runs automatically", "performs a specific task", "replaces main()", "compiles program"], correct: 1, topic: "Function" },
            {
                q: `Output of code:

#include <stdio.h>
int main() {
    int i = 5;
    do{
        printf("%d", i);
        i--;
    }while(i > 5);

    return 0;
    }`,
                options: [
                    "No output",
                    "54321",
                    "5",
                    "Infinite loop"
                ],
                correct: 2,
                topic: "loops"
            },
            {
                q: `Output of code:

#include <stdio.h>
int main() {
    int i;
    for(i = 1; i <= 5; i++){
        if(i == 3)
            break;
        printf("%d", i);
    }

    return 0;
    }`,
                options: [
                    "123",
                    "12",
                    "3",
                    "None"
                ],
                correct: 1,
                topic: "loops"
            },
            {
                q: `Output of code:

#include <stdio.h>
int main() {
    int a[] = {1,2,3,4};
    printf("%d", a[2]);

   return 0;
    }`,
                options: [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                correct: 2,
                topic: "Array"
            },
            { q: "How many values can a function return directly?", options: ["0", "1", "2", "many"], correct: 1, topic: "functions" }
        ],
        2: [
            { q: "What is a pointer?", options: ["Variable storing address", "Data type", "Function", "Loop"], correct: 0, topic: "advanced" },
            { q: "Dynamic memory allocation uses?", options: ["malloc()", "alloc()", "new()", "create()"], correct: 0, topic: "advanced" },
            { q: "Which operator is used to dereference?", options: ["&", "*", "->", "::"], correct: 1, topic: "advanced" },
            { q: "What is memory leak?", options: ["Unused allocated memory", "Stack overflow", "Syntax error", "Runtime error"], correct: 0, topic: "advanced" },
            { q: "Array indexing starts from?", options: ["1", "0", "-1", "Depends"], correct: 1, topic: "advanced" }
        ],
        3: [
            { q: "How to pass array to function?", options: ["By value", "By reference", "Both", "Cannot pass"], correct: 1, topic: "methods" },
            { q: "What is recursion?", options: ["Function calling itself", "Loop", "Pointer", "Array"], correct: 0, topic: "methods" },
            { q: "Function return type void means?", options: ["Returns nothing", "Returns 0", "Error", "Invalid"], correct: 0, topic: "methods" },
            { q: "What is function prototype?", options: ["Function declaration", "Function definition", "Function call", "Function pointer"], correct: 0, topic: "methods" },
            { q: "Call by value means?", options: ["Copy of variable", "Address passed", "Reference passed", "None"], correct: 0, topic: "methods" }
        ],
        4: [
            { q: "Does C support OOP?", options: ["Yes, fully", "No, procedural", "Partially", "Depends"], correct: 1, topic: "oop" },
            { q: "Structure in C uses keyword?", options: ["class", "struct", "object", "type"], correct: 1, topic: "oop" },
            { q: "Can struct have functions in C?", options: ["Yes", "No", "Only pointers", "Only static"], correct: 1, topic: "oop" },
            { q: "What is typedef used for?", options: ["Creating alias", "Defining functions", "Memory allocation", "Type conversion"], correct: 0, topic: "oop" },
            { q: "Union vs Structure difference?", options: ["Memory sharing", "Syntax", "Keywords", "No difference"], correct: 0, topic: "oop" }
        ]
    },


};

const optionLabels = ['A', 'B', 'C', 'D'];

function selectLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('languageTitle').textContent = lang + ' Tests';
    showPage('testSelectionPage');
}

function selectTest(testNum) {
    currentTest = testNum;
    showPage('studentInfoPage');
}

function sendPassword() {
    const name = document.getElementById('studentName').value.trim();
    const email = document.getElementById('studentEmail').value.trim();

    if (!name || !email) {
        alert('Please fill all fields');
        return;
    }

    studentData = { name, email, teacherEmail: TEACHER_EMAIL };
    testPassword = Math.random().toString(36).substring(2, 8).toUpperCase();

    const templateParams = {
        to_email: email,
        student_name: name,
        password: testPassword,
        language: currentLanguage,
        test_number: currentTest
    };

    emailjs.send('service_94jg5nx', 'template_rugm8ej', templateParams)
        .then(() => {
            alert('Password sent to your email! Please check.');
            showPage('passwordPage');
        })
        .catch((error) => {
            console.error('Email error:', error);
            alert('Demo mode: Your password is ' + testPassword);
            showPage('passwordPage');
        });
}

function verifyPassword() {
    const entered = document.getElementById('passwordInput').value.trim();
    if (entered === testPassword) {
        startQuiz();
    } else {
        alert('Incorrect password! Please try again.');
    }
}

function startQuiz() {
    currentQuestion = 0;
    isReviewMode = false;
    testResults = null;
    totalQuestions = questionBank[currentLanguage][currentTest].length;
    userAnswers = new Array(totalQuestions).fill(null);
    timeRemaining = 3600;
    showPage('quizPage');
    document.getElementById('studentNameDisplay').textContent = studentData.name;
    document.getElementById('quizTitle').textContent = `${currentLanguage} - Test ${currentTest}`;
    startTimer();
    renderQuestion();
    renderQuestionNav();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        const mins = Math.floor(timeRemaining / 60);
        const secs = timeRemaining % 60;
        document.getElementById('timer').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function renderQuestion() {
    const questions = questionBank[currentLanguage][currentTest];
    const q = questions[currentQuestion];

    document.getElementById('questionNumber').textContent =
        `Question ${currentQuestion + 1} of ${totalQuestions}`;
    document.getElementById('questionText').textContent = q.q;

    let optionsHtml = '';

    if (isReviewMode) {
        const userAns = userAnswers[currentQuestion];
        const correctAns = q.correct;

        optionsHtml = q.options.map((opt, idx) => {
            let optionClass = 'option';
            let indicatorHtml = '';

            if (idx === correctAns) {
                optionClass += ' correct-answer';
                indicatorHtml = '<span style="margin-left: 10px; color: #28a745; font-weight: bold;">✓ Correct Answer</span>';
            }

            if (idx === userAns && userAns !== correctAns) {
                optionClass += ' wrong-answer';
                indicatorHtml = '<span style="margin-left: 10px; color: #dc3545; font-weight: bold;">✗ Your Answer</span>';
            }

            return `<div class="${optionClass}">
                <div class="option-label">${optionLabels[idx]}</div>
                <div class="option-text">${opt}${indicatorHtml}</div>
            </div>`;
        }).join('');
    } else {
        optionsHtml = q.options.map((opt, idx) =>
            `<div class="option ${userAnswers[currentQuestion] === idx ? 'selected' : ''}" 
                  onclick="selectOption(${idx})">
                <div class="option-label">${optionLabels[idx]}</div>
                <div class="option-text">${opt}</div>
            </div>`
        ).join('');
    }

    document.getElementById('optionsContainer').innerHTML = optionsHtml;

    if (isReviewMode) {
        document.getElementById('prevBtn').style.display =
            currentQuestion === 0 ? 'none' : 'inline-block';
        document.getElementById('nextBtn').style.display =
            currentQuestion === totalQuestions - 1 ? 'none' : 'inline-block';

        // Change submit button to "Go to Home" button in review mode
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.style.display = 'block';
        submitBtn.textContent = '🏠 Go to Home';
        submitBtn.style.background = '#6c757d';
        submitBtn.onclick = showHome;
    } else {
        document.getElementById('prevBtn').style.display =
            currentQuestion === 0 ? 'none' : 'inline-block';
        document.getElementById('nextBtn').style.display =
            currentQuestion === totalQuestions - 1 ? 'none' : 'inline-block';

        // Reset submit button to original state
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.style.display = 'block';
        submitBtn.textContent = 'Submit Test';
        submitBtn.style.background = '#28a745';
        submitBtn.onclick = confirmSubmit;
    }
}

function selectOption(idx) {
    if (!isReviewMode) {
        userAnswers[currentQuestion] = idx;
        renderQuestion();
        renderQuestionNav();
    }
}

function renderQuestionNav() {
    const questions = questionBank[currentLanguage][currentTest];

    let navHtml = '';

    if (isReviewMode) {
        navHtml = Array.from({ length: totalQuestions }, (_, i) => {
            const isCorrect = userAnswers[i] === questions[i].correct;
            const answerClass = isCorrect ? 'correct-nav' : 'wrong-nav';
            const activeClass = i === currentQuestion ? 'active' : '';

            return `<button class="question-btn ${answerClass} ${activeClass}" 
                    onclick="goToQuestion(${i})">${i + 1}</button>`;
        }).join('');
    } else {
        navHtml = Array.from({ length: totalQuestions }, (_, i) =>
            `<button class="question-btn ${userAnswers[i] !== null ? 'answered' : ''} 
                    ${i === currentQuestion ? 'active' : ''}" 
                    onclick="goToQuestion(${i})">${i + 1}</button>`
        ).join('');
    }

    document.getElementById('questionNav').innerHTML = navHtml;
}

function goToQuestion(idx) {
    currentQuestion = idx;
    renderQuestion();
    renderQuestionNav();
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
        renderQuestionNav();
    }
}

function nextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        renderQuestion();
        renderQuestionNav();
    }
}

function submitQuiz() {
    clearInterval(timerInterval);
    calculateResults();
}

function calculateResults() {
    const questions = questionBank[currentLanguage][currentTest];
    let score = 0;
    const topicScores = {};

    questions.forEach((q, idx) => {
        if (!topicScores[q.topic]) {
            topicScores[q.topic] = { correct: 0, total: 0 };
        }
        topicScores[q.topic].total++;

        if (userAnswers[idx] === q.correct) {
            score++;
            topicScores[q.topic].correct++;
        }
    });

    const weakTopics = [];
    for (const topic in topicScores) {
        const percentage = (topicScores[topic].correct / topicScores[topic].total) * 100;
        if (percentage < 60) {
            weakTopics.push(`${topic} (${topicScores[topic].correct}/${topicScores[topic].total} correct)`);
        }
    }

    testResults = { score, weakTopics };
    displayResults(score, weakTopics);
    sendResultEmail(score, weakTopics);
}

function displayResults(score, weakTopics) {
    showPage('resultPage');

    const percentage = (score / totalQuestions) * 100;
    document.getElementById('scoreDisplay').textContent = `${score}/${totalQuestions}`;
    document.getElementById('correctAnswers').textContent = score;
    document.getElementById('incorrectAnswers').textContent = totalQuestions - score;
    document.getElementById('percentageDisplay').textContent = `${percentage.toFixed(1)}%`;

    let message = '';
    if (percentage >= 80) message = 'Excellent! Outstanding performance!';
    else if (percentage >= 60) message = 'Good job! Keep practicing!';
    else message = 'Need more practice. Don\'t give up!';

    document.getElementById('resultMessage').textContent = message;

    const weakTopicsHtml = weakTopics.length > 0
        ? `<h3>⚠️ Areas for Improvement:</h3><ul>${weakTopics.map(t => `<li>${t}</li>`).join('')}</ul>`
        : '<h3>✅ Great! No weak areas identified!</h3>';

    document.getElementById('weakTopicsContainer').innerHTML = weakTopicsHtml;
}

function sendResultEmail(score, weakTopics) {
    const weakTopicsText = weakTopics.length > 0 ?
        weakTopics.join(', ') : 'No weak areas - Excellent performance!';

    const studentParams = {
        to_email: studentData.email,
        student_name: studentData.name,
        teacher_email: studentData.teacherEmail,
        language: currentLanguage,
        test_number: currentTest,
        score: score,
        total: totalQuestions,
        percentage: ((score / totalQuestions) * 100).toFixed(2),
        weak_topics: weakTopicsText
    };

    emailjs.send('service_94jg5nx', 'template_1c92fy8', studentParams)
        .then(() => console.log('Results sent to student successfully'))
        .catch((error) => console.error('Student email error:', error));

    const teacherParams = {
        to_email: TEACHER_EMAIL,
        student_name: studentData.name,
        language: currentLanguage,
        test_number: currentTest,
        score: score,
        total: totalQuestions,
        percentage: ((score / totalQuestions) * 100).toFixed(2),
        weak_topics: weakTopicsText
    };

    emailjs.send('service_94jg5nx', 'template_1c92fy8', teacherParams)
        .then(() => console.log('Results sent to teacher successfully'))
        .catch((error) => console.error('Teacher email error:', error));
}

function reviewAnswers() {
    isReviewMode = true;
    currentQuestion = 0;
    showPage('quizPage');
    document.getElementById('studentNameDisplay').textContent = studentData.name + ' - Review Mode';
    document.getElementById('quizTitle').textContent = `${currentLanguage} - Test ${currentTest} (Review)`;
    document.getElementById('timer').textContent = 'Review Mode';
    document.getElementById('timer').style.background = '#667eea';
    renderQuestion();
    renderQuestionNav();
}

function showPage(pageId) {
    document.querySelectorAll('.container > div').forEach(div => {
        div.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

function showHome() {
    clearInterval(timerInterval);
    currentLanguage = '';
    currentTest = 0;
    currentQuestion = 0;
    totalQuestions = 0;
    isReviewMode = false;
    testResults = null;
    showPage('homePage');
}

function showTestSelection() {
    showPage('testSelectionPage');
}

function confirmSubmit() {
    const unanswered = userAnswers.filter(ans => ans === null).length;

    if (unanswered > 0) {
        const confirmMsg = `You have ${unanswered} unanswered question(s). Are you sure you want to submit?`;
        if (confirm(confirmMsg)) {
            submitQuiz();
        }
    } else {
        if (confirm('Are you sure you want to submit the test?')) {
            submitQuiz();
        }
    }
}

// Add CSS for review mode dynamically
const reviewStyles = `
    .correct-answer {
        border-color: #28a745 !important;
        background: #d4edda !important;
    }
    
    .wrong-answer {
        border-color: #dc3545 !important;
        background: #f8d7da !important;
    }
    
    .correct-nav {
        background: #28a745 !important;
        color: white !important;
        border-color: #28a745 !important;
    }
    
    .wrong-nav {
        background: #dc3545 !important;
        color: white !important;
        border-color: #dc3545 !important;
    }
`;

if (!document.getElementById('review-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'review-styles';
    styleSheet.textContent = reviewStyles;
    document.head.appendChild(styleSheet);

}
