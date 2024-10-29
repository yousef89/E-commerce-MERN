import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const baseUrl = import.meta.env.VITE_BASE_URL;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleRegister(values: any) {
    try {
      const response = await fetch(`${baseUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || "User already exists", {
          className: "bg-red-500 text-white border border-red-600",
        });
        return;
      }

      const data = await response.json();
      login(values.email, data);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while registering", {
        className: "bg-red-500 text-white border border-red-600",
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center pt-[5%]">
      <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-3xl p-10">
        <h1 className="text-[40px] font-josefin text-blue-500">Register an account</h1>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center mt-5 w-[200px] gap-y-3">
              <div className="w-full">
                <label className="text-[20px] font-josefin font-semibold">First Name</label>
                <Field
                  name="firstName"
                  className="w-full text-center shadow-md border-2 border-gray-400 rounded-md hover:border-blue-400 transition"

                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="w-full">
                <label className="text-[20px] font-josefin font-semibold">Last Name</label>
                <Field
                  name="lastName"
                  className="w-full text-center shadow-md border-2 border-gray-400 rounded-md hover:border-blue-400 transition"

                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="w-full">
                <label className="text-[20px] font-josefin font-semibold">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full text-center shadow-md border-2 border-gray-400 rounded-md hover:border-blue-400 transition"

                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="w-full">
                <label className="text-[20px] font-josefin font-semibold">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full text-center shadow-md border-2 border-gray-400 rounded-md hover:border-blue-400 transition"

                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                className="w-[100px] bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-600 active:bg-blue-800 transition mt-3 font-josefin text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}