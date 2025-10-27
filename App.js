import { useState, useRef, useEffect } from "react";
import { TouchableOpacity, View, Dimensions, Text, TextInput, StyleSheet } from "react-native";

const App = () => {
    const [inputNum, setInputNum] = useState('')
    const list_pad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']
    const wp = Dimensions.get('screen').width;
    const hp = Dimensions.get('screen').height;
    const inputRef = useRef(null);

    function isInt(value) {
        return /^-?\d+$/.test(value);
    }

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 500);
    }, []);

    return (
        <View style={styles.container(wp, hp)}>
            <View style={styles.layoutTextInput}>
                <TextInput
                    ref={inputRef}
                    style={styles.styleTextInput(wp, hp)}
                    value={inputNum.toString()}
                    showSoftInputOnFocus={false}
                />
                <TouchableOpacity style={styles.buttonDel(wp, hp)}
                    onPress={() => {
                        setInputNum(inputNum.slice(0, -1))
                    }}
                >
                    <Text>{'⌫'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.layoutKeypad(wp, hp)}>
                {list_pad.map((item, index) => {
                    return <TouchableOpacity
                        key={index + 1}
                        style={styles.buttonKeypad(wp, hp)}
                        onPress={() => {
                            if (isInt(item)) {
                                setInputNum(inputNum + item)
                            }
                        }}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                })}
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: (wp, hp) => ({
        width: wp,
        height: hp * 0.7,
        alignItems: 'center',
        justifyContent: 'center'
    }),
    styleTextInput: (wp, hp) => ({
        width: wp * 0.8,
        height: hp * 0.07,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: wp * 0.02
    }),
    layoutTextInput: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonDel: (wp, hp) => ({
        width: wp * 0.20,
        height: hp * 0.07,
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        right: 0,
        paddingRight: wp * 0.04,
    }),
    layoutKeypad: (wp, hp) => ({
        flexWrap: 'wrap',
        width: wp * 0.65,
        flexDirection: 'row',
        height: hp * 0.2,
        justifyContent: 'space-between',
        marginTop: hp * 0.02
    }),
    buttonKeypad: (wp, hp) => ({
        width: wp * 0.20,
        height: wp * 0.20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        borderColor: '#000000',
        borderWidth: 1,
        marginTop: hp * 0.01
    })
});

export default App;