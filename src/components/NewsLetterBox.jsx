export default function NewsLetter() {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe Now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo sed
        laboriosam accusamus et qui sunt totam molestiae aliquam, ut ex unde,
        impedit sapiente beatae obcaecati illo illum cupiditate est tempora!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex item-center gap-3 mx-auto  my-6 border pl-3  "
      >
        <input
          className="w-full sm:w-1/2 sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your Email"
          required
        ></input>
        <button
          type="submit"
          className="bg-black text-xs text-white px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}
