import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight
} from "react-native";
import { greenColors, grayColors } from "../constants/colors";
import { connect } from "react-redux";
import { createAccount, verifyLogin } from "../dataManager/postRequests";
import { accountTextInputHeight } from "../constants/sizes";

export const CreateAccount = (props: any) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setpassword] = React.useState<string>("");
  const [password_retyped, setpassword_retyped] = React.useState<string>("");
  const createFinalAccount = () => {
    if (username.length == 0) {
      alert("Username cannot be empty.");
    } else if (password.length == 0) {
      alert("Password cannot be empty.");
    } else if (!(password === password_retyped)) {
      alert("Passwords do not match.");
    } else {
      createAccount(username, password, props.navigation);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="title">
        Create Account
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={user => setUsername(user)}
        placeholder="Username"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={pass => setpassword(pass)}
        placeholder="Password"
        secureTextEntry={true}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={pass => setpassword_retyped(pass)}
        placeholder="Re-Type Password"
        secureTextEntry={true}
      ></TextInput>
      <View style={styles.loginButton}>
        <TouchableHighlight
          underlayColor="#ccc"
          onPress={() => createFinalAccount()}
          style={styles.touchable}
        >
          <Text style={styles.loginText}>Create Account</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: greenColors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  title: {
    fontSize: 30,
    paddingBottom: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    color: greenColors.deep
  },
  textInput: {
    width: "80%",
    backgroundColor: grayColors.light,
    margin: 10,
    height: accountTextInputHeight,
    fontSize: 20,
    paddingLeft: 10
  },
  touchable: {
    backgroundColor: greenColors.deep,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10
  },
  loginButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10
  },
  loginText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  }
});

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.pageSetup.isLoading,
    isTranscript: state.pageSetup.isShowingTranscript
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
