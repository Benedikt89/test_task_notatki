import * as React from "react";
import {Button, PageHeader} from "antd";
import './Header.css';
import {Link} from "react-router-dom";
import {getLocale} from "../../constants/languageType";

class Header extends React.Component {
    render() {
        return (
            <PageHeader
                //className="site-page-header-responsive"
                extra={[
                    <Link to='/users' key="1">
                      <Button type="text" style={{color: '#fff'}}>
                        {getLocale("eng", 'header_users')}
                      </Button>
                    </Link>,
                    <Link to='/tickets' key="2">
                      <Button type="text" style={{color: '#fff'}}>
                        {getLocale("eng", 'header_tickets')}
                      </Button>
                    </Link>,

                ]}
                style={{backgroundColor: '#00334E'}}
            />
        )
    }
}

export default Header;