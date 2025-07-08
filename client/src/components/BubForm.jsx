import { useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";

const BubForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorValue, setErrorValue] = useState("");

  return (
    <Formik
      initialValues={{
        longUrl: "",
        custom: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        setError(false);
        setIsLoading(true);
        const url = `${import.meta.env.VITE_API_URL}/urls/`;
        axios
          .post(url, values)
          .then((res) => {
            // console.log(res.data);
            const { data } = res;
            alert(
              `URL shortened successfully! Your short URL is: ${data.url.shortUrl}`
            );
            setError(false);
            setIsLoading(false);
            resetForm();
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            setError(true);
            setErrorValue(err.response.data.msg);
            setIsLoading(false);
          });
      }}
    >
      <Form className="mt-10 bg-white px-5 py-10 rounded-md shadow-2xl max-w-md">
        {error && <p className="text-sm text-red-500">{errorValue}</p>}
        <div className="longUrl mb-4">
          <label htmlFor="longUrl" className="mb-2 block font-semibold">
            Enter your long URL here
          </label>
          <Field
            type="url"
            id="longUrl"
            name="longUrl"
            placeholder="https://example.com/"
            required
            className="border border-[#ad8769] p-2 w-full rounded-md outline-none focus:border-[#ad8769] focus:ring-1 focus:ring-[#ad8769]"
          />
        </div>

        <div className="buttons">
          <button
            type="submit"
            className="bg-[#ad8769] text-white px-5 py-3 rounded-md cursor-pointer"
          >
            {isLoading ? "Loading..." : "Bub It"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default BubForm;
