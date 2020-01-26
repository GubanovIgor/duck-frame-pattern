import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../../features/Auth/duck';


const mapStateToProps = (state) => { return {...state} };
const mapDispatchToProps = dispatch => bindActionCreators(duck.actions, dispatch);

const IndexPage = ({logoutAction}) => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <h1>Index</h1>
          <button onClick={logoutAction}>Выйти</button>
        </Col>
      </Row>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);