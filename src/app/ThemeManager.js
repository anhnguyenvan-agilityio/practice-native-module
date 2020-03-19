import React from 'react';
import ThemeColors from './ThemeColors';
import translations from './translation';

export const ManageThemeContext = React.createContext();

export const useTheme = () => React.useContext(ManageThemeContext);

export class ThemeManager extends React.Component {
  state = {
    mode: 'default',
    language: 'en',
  };

  componentDidUpdate() {
    console.log('theme updated');
  }

  changeTheme = async mode => {
    this.setState({
      mode,
    });
  };

  changeLanguage = async language => {
    this.setState({
      language,
    });
  };

  render() {
    return (
      <ManageThemeContext.Provider
        value={{
          mode: this.state.mode,
          language: this.state.language,
          theme: ThemeColors[this.state.mode],
          languageData: translations[this.state.language],
          changeTheme: this.changeTheme,
          changeLanguage: this.changeLanguage,
        }}
      >
        {this.props.children}
      </ManageThemeContext.Provider>
    );
  }
}

export default ThemeManager;
