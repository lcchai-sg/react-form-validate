import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const formDefaultValues = {
    name: null,
    email: null,
    password: null,
    cpassword: null,
    handphone: null,
    referrer: null,
    errors: {}
  }
  const formDefaultErrors = {
    name: [],
    email: [],
    password: [],
    handphone: [],
    referrer: [],
  }

  const [formValues, setFormValues] = useState(formDefaultValues);
  const [formErrors, setFormErrors] = useState(formDefaultErrors);
  const { name, email, password, cpassword, handphone, referrer } = formValues;

  useEffect(() => {
    console.dir(formValues);
  }, [formValues]);

  useEffect(() => {
    console.dir('componenet did mount')
  }, []);

  const handleChange = (e, validators) => {
    const target = e.target;
    // e.preventDefault();
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }))

    handleValidations(target, validators);
  }

  const handleValidations = (target, validators) => {
    validators.forEach(validation => {
      const result = validation(target.value);
      const errors = formErrors[target.name]
      if (result.valid) {
        if (errors.includes(result.message)) {
          setFormErrors(prevState => ({
            ...prevState,
            [target.name]: errors.filter(error => error !== result.message)
          }))
        }
      } else {
        if (!errors.includes(result.message)) {
          setFormErrors(prevState => ({
            ...prevState,
            [target.name]: [...errors, result.message],
          }))
        }
      }
    })
  }

  const noBlanks = value => {
    return {
      valid: value.replace(/\$+/g, "").length > 0,
      message: 'cannot be blank',
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

  }

  return (
    <div className="wrapper" >
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="name">
            <label htmlFor="name">Name / 姓名</label>
            <input
              type="text"
              name="name"
              placeholder=" enter your name / 输入姓名"
              onChange={e => handleChange(e, [noBlanks])} />
          </div>

          {formErrors.name.length > 0 && (
            <span className="errorMessage">{formErrors.name}</span>
          )}

          <div className="email">
            <label htmlFor="email">Email / 邮箱</label>
            <input
              type="email"
              name="email"
              placeholder=" enter your email / 输入邮箱"
              onChange={handleChange} />
          </div>

          {formErrors.email.length > 0 && (
            <span className="errorMessage">{formErrors.email}</span>
          )}

          <div className="password">
            <label htmlFor="password">Password / 密码</label>
            <input
              type="password"
              name="password"
              placeholder=" enter password / 输入密码"
              onChange={handleChange} />
          </div>

          {formErrors.password.length > 0 && (
            <span className="errorMessage">{formErrors.password}</span>
          )}

          <div className="password">
            <label htmlFor="cpassword">Confirm Password / 确认密码</label>
            <input
              type="password"
              name="cpassword"
              placeholder=" enter password again to confirm / 确认密码"
              onChange={handleChange} />
          </div>

          <div className="handphone">
            <label htmlFor="handphone">Handphone / 手机号</label>
            <input
              type="text"
              name="handphone"
              placeholder=" enter contact number / 输入联系号码"
              onChange={handleChange} />
          </div>

          {formErrors.handphone.length > 0 && (
            <span className="errorMessage">{formErrors.handphone}</span>
          )}

          <div className="referrer">
            <label htmlFor="referrer">Referrer / 推荐人</label>
            <input
              type="text"
              name="referrer"
              placeholder=" enter referrer ID / 输入推荐人号码"
              onChange={handleChange} />
          </div>

          {formErrors.referrer.length > 0 && (
            <span className="errorMessage">{formErrors.referrer}</span>
          )}
          <div className="createAccount">
            <button type="submit">Create Account / 注册</button>
            <small>Already Have an Account? / 账号登陆?</small>
          </div>

        </form>
      </div>
    </div>
  );
}

