import { connect } from 'react-redux';
import moment from 'moment';
import { fetchAPOD, STATUS } from './actions';
import React, { Component, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import NavigateAfter from 'material-ui/svg-icons/image/navigate-next';
import Loading from 'react-loading-animation';
import { Link } from 'react-router';

class APOD extends Component {
  static props = {
    apod: PropTypes.shape({
      explanation: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
    dateBefore: PropTypes.string,
    dateAfter: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }
  
  componentDidMount() {
    const date = this.props.params.date || new Date().toISOString().substring(0,10);
    this.fetchAPOD(date);
  }

  fetchAPOD(date) {
    this.props.dispatch(fetchAPOD(date));
  }
  
  render() {
    const apod = this.props.apod;

    return (
      <Loading isLoading={this.props.isLoading}>
        <Card style={{margin:'36px auto', minWidth: '320px', width: '30%'}}>
          <CardTitle title={apod.title}/>
          <CardMedia>
            <img src={apod.url} alt="APOD"/>
          </CardMedia>
          <CardText>
            {apod.explanation}
          </CardText>
          <CardActions style={{textAlign: 'center'}}>
            <Link to={`/${this.props.dateBefore}`} style={{margin: '0px 36px'}} onTouchTap={() => this.fetchAPOD(this.props.dateBefore)}>
              <NavigateBefore/>
            </Link>
            <Link to={`/${this.props.dateAfter}`} style={{margin: '0px 36px'}} onTouchTap={() => this.fetchAPOD(this.props.dateAfter)}>
              <NavigateAfter/>
            </Link>
          </CardActions>
        </Card>
      </Loading> 
    )
  }
}

const getBeforeDate = (date) => {
  return moment(date).subtract(1, 'd').format('YYYY-MM-DD').toString();
}

const getAfterDate = (date) => {
  return moment(date).add(1, 'd').format('YYYY-MM-DD').toString();
}

const isLoading = (status) => {
  console.log(status);
  switch(status) {
    case STATUS.LOADING:
      return true;
    case STATUS.FINISHED:
      return false;
    default:
      return true;
  }
}

const mapStateToProps = state => {
  return {
    apod: state.apod,
    isLoading: isLoading(state.requestStatus),
    dateBefore: getBeforeDate(state.apod.date),
    dateAfter: getAfterDate(state.apod.date),
  };
};

export default connect(
  mapStateToProps
)(APOD);