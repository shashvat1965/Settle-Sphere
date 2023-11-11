export default function CustomStyles() {
    return {
        indicatorSeparator: () => {},
        valueContainer: (provided) => ({
          ...provided,
          // height: "1.8rem",
          paddingLeft: 0,
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          // height: "1.8rem",
        }),
    
        singleValue: (provided) => ({
            ...provided,
            color: "#fff",
            fontFamily: "Open Sans",
            fontSize: "1.5rem",
          }),
      
        control: (provided, state) => ({
            ...provided,
            minHeight: "1rem",
            // height: "2rem",
            backgroundColor: "transparent",
            border: "none",
            borderBottom: state.isFocused ? "2px solid #98d448" : "2px solid #98d448",
            "&:hover": {
              borderColor: "#98d448",
            },
            outline: "none",
            boxShadow: "none",
            borderRadius: "0px",
          }),
      
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "#fff" : "#fff",
            backgroundColor: state.isSelected ? "#8a2a9b" : "#222",
            fontFamily: "Open Sans",
            fontSize: "1.25rem",
            zIndex: 1002,
            "&:hover": {
              backgroundColor: "#8a2a9b",
              color: "#fff",
            },
          }),  
          menu: (provided) => ({
            ...provided,
            zIndex: 1002,
            backgroundColor: "#222222",
            paddingTop: "0px",
            paddingBottom: "0px",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              display: "none",
            },
          }),
          menuList: (provided) => ({
            ...provided,
            maxHeight: '150px',
            paddingTop: "1rem",
            paddingBottom: "1rem",
            backgroundColor: "#222222",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              display: "none",
            },
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            color: "white",
            padding: "5px",
          }),
          placeholder: (provided , state) => ({
            ...provided,
            fontFamily: "Open Sans",
            fontSize: "1.25rem",
            opacity: "1",
            color: "rgba(255, 255, 255, 0.6)",
            opacity: state.isFocused ? "0" : "1",
          }),
          container: (provided) => ({
            ...provided,
            overflow: "visible",
          }),
          noOptionsMessage: (provided) => ({
            ...provided,
            color: "#fff",
            fontFamily: "Open Sans",
            fontSize: "1.25rem",
            paddingLeft: "1rem",
            backgroundColor: "#222222",
            paddingTop: "0px",
            paddingBottom: "0px",
          }),
          clearIndicator: (provided) => ({
            ...provided,
            color: '#fff',
            '&:hover': {
              color: '#5db3f1'
            }
          }),
      
      
          
    }
}
