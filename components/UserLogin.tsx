import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image
} from "react-native";
import { greenColors, blueColors, grayColors } from "../constants/colors";
import { accountTextInputHeight } from "../constants/sizes";
import { connect } from "react-redux";
import { verifyLogin } from "../dataManager/postRequests";
import i18n from "i18n-js";

export const UserLogin = (props: any) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setpassword] = React.useState<string>("");
  const loginFunc = () => {
    if (username.length == 0) {
      alert("Username cannot be empty.");
    } else if (password.length == 0) {
      alert("Password cannot be empty.");
    } else {
      let finished = verifyLogin(username, password, props.navigation);
      // if (finished) {
      //props.navigation.navigate("MainApp");
      // } else {
      //   alert("Either username or password is incorrect.");
      // }
    }
  };
  const createAccount = () => {
    props.navigation.navigate("CreateAccount");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../constants/images/vizbuzz_wordart.png")}
        resizeMode="contain"
        style={{
          maxHeight: 150,
          maxWidth: 400
        }}
      />
      <Text style={styles.title} testID="title">
        {i18n.t("login")}
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={user => setUsername(user)}
        placeholder={i18n.t("username")}
      ></TextInput>
      <TextInput
        secureTextEntry={true}
        style={styles.textInput}
        onChangeText={pass => setpassword(pass)}
        placeholder={i18n.t("password")}
        secureTextEntry={true}
      ></TextInput>
      <View style={styles.loginButton}>
        <TouchableHighlight
          underlayColor="#ccc"
          onPress={() => loginFunc()}
          style={styles.touchable}
        >
          <Text style={styles.loginText}>{i18n.t("login")}</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.title}>
        <TouchableHighlight
          underlayColor="#ccc"
          onPress={() => createAccount()}
          style={styles.touchable2}
        >
          <Text style={styles.createAccountText}>
            {i18n.t("create_a_new_account")}
          </Text>
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
  touchable2: {
    // backgroundColor: blueColors.light,
    // borderColor: "#FFFFFF",
    // borderWidth: 1,
    alignItems: "center"
    // borderRadius: 10
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
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  createAccountText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    color: greenColors.deep,
    textDecorationLine: "underline",
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

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
