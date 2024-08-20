
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Calculator = (props) => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    console.log(input);

    const handleInput = (value) => {
        setInput(input + value);
    };

    useEffect(() => {
        if (input == '8+8+2000') {
            props.navigation.navigate('splase')
        }
    }, [input])

    const removeTrailingOperator = (i) => {
        const operators = ['+', '-', '/', '*'];
        const lastChar = i.slice(-1);
        if (operators.includes(lastChar)) {
            return i.slice(0, -1);
        }
        return i
    };

    const calculateResult = () => {
        try {
            setResult(eval(input).toString()); // Using eval for simplicity, but be cautious
            // if (input == '8+8+2000') {
            //     props.navigation.navigate('splase')
            // }
        } catch (error) {
            // setResult('Error');
            setInput(removeTrailingOperator(input))
        }
    };

    const clear = () => {
        setInput('');
        setResult('');
    };

    const backspace = () => {
        setInput(input.slice(0, -1)); // Remove the last character from the input
    };

    return (
        <View style={styles.container}>
            <Text style={styles.result}>{result}</Text>
            <Text style={styles.input}>{input}</Text>
            <View style={{ position: 'absolute', bottom: 50, left: 10, right: 10 }}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleInput('1')} style={styles.button}><Text style={styles.buttonText}>1</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('2')} style={styles.button}><Text style={styles.buttonText}>2</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('3')} style={styles.button}><Text style={styles.buttonText}>3</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('+')} style={styles.button}><Text style={styles.buttonText}>+</Text></TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleInput('4')} style={styles.button}><Text style={styles.buttonText}>4</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('5')} style={styles.button}><Text style={styles.buttonText}>5</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('6')} style={styles.button}><Text style={styles.buttonText}>6</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('-')} style={styles.button}><Text style={styles.buttonText}>-</Text></TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleInput('7')} style={styles.button}><Text style={styles.buttonText}>7</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('8')} style={styles.button}><Text style={styles.buttonText}>8</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('9')} style={styles.button}><Text style={styles.buttonText}>9</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('*')} style={styles.button}><Text style={styles.buttonText}>*</Text></TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity onPress={clear} style={styles.button}><Text style={styles.buttonText}>C</Text></TouchableOpacity>
                    <TouchableOpacity onPress={backspace} style={[styles.button, { flex: 1 }]}><Text style={styles.buttonText}>⌫</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('0')} style={styles.button}><Text style={styles.buttonText}>0</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('/')} style={styles.button}><Text style={styles.buttonText}>/</Text></TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity onPress={calculateResult} style={styles.button}><Text style={styles.buttonText}>=</Text></TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        padding: 10,
    },
    input: {
        fontSize: 36,
        color: 'black',
        textAlign: 'right',
        marginBottom: 10,
        marginTop: 10,
    },
    result: {
        fontSize: 48,
        color: 'green',
        textAlign: 'right',
        marginBottom: 20,
        marginTop: 200
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 100,
    },
    buttonText: {
        fontSize: 24,
        color: 'black',
    },
});

export default Calculator;
