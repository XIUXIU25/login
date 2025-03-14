// export function Button({ children, onClick, className = "" }) {
//     return (
//       <button
//         className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${className}`}
//         onClick={onClick}
//       >
//         {children}
//       </button>
//     );
//   }
  

export function Button({ children, onClick, type = "primary" }) {
    const baseStyle = "px-4 py-2 rounded-md font-semibold";
    const styles = {
      primary: "bg-blue-500 text-white hover:bg-blue-700 ",
      secondary: "bg-gray-300 text-gray-800 hover:bg-gray-500",
      danger: "bg-red-500 text-white hover:bg-red-700",
    };
  
    return (
      <button className={`${baseStyle} ${styles[type]}`} onClick={onClick}>
        {children}
      </button>
    );
  }
  // export default Button;
  