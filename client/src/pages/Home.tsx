import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [formData, setFormData] = useState({
    income: "",
    expenses: "",
    savings: "",
    tax_bracket: "",
    goals: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFormSubmit = async() => {
      axios.post("http://localhost:8080/api/finance/submit", formData).then(res => {
        console.log(res)
        alert("Form submitted successfully!")
      }).catch(err =>{ 
        console.log("err", err)
      })
  }

  return (
    <div>
      <h3> Welcome to Finance Assistant </h3>
      <section className="form-container">
        <p style={{
          gap: "10px",
          display: "flex",
          alignItems: "center"
        }}>
        <label htmlFor="income">Income</label>
        <input type="text" id="income" name="income" placeholder="Monthly Income" onChange={handleChange} />
        </p>
        <p style={{
          gap: "10px",
          display: "flex",
          alignItems: "center"
        }}>
        <label htmlFor="expenses">Expenses</label>
        <input type="text" id="expenses" name="expenses" placeholder="Monthly Expenses" onChange={handleChange} />
        </p>
        <p style={{
          gap: "10px",
          display: "flex",
          alignItems: "center",
        }}>
        <label htmlFor="savings">Savings</label>
        <input type="text" id="savings" name="savings" placeholder="Monthly Savings" onChange={handleChange} />
        </p>
        <p style={{
          gap: "10px",
          display: "flex",
          alignItems: "center"
        }}>
        <label htmlFor="tax_bracket">Tax Bracket</label>
        <input type="text" id="tax_bracket" name="tax_bracket" placeholder="Tax Bracket/ Percentage" onChange={handleChange} />
        </p>
        <p style={{
          gap: "10px",
          display: "flex",
          alignItems: "center"
        }}>
        <label htmlFor="goals">Goals</label>
        <input type="text" id="goals" name="goals" placeholder="Your financial goals" onChange={handleChange} />
        </p>

        <button className="submitBtn" onClick={handleFormSubmit}>Submit</button>
      </section>
    </div>
  )
}

export default Home;