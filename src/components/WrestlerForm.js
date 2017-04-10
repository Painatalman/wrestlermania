/*
The wrestler form either creates or updates a wrestler

The form has its own local state. Basically the internal wrestler state

The add_wrestler and update_wrestler methods in redux will eventually
have a wrestlerSubmissionStatus property. The form will react according
to these status
 - submitting - enable the form
 - success - clean the form
 - error - enable the form, do not clean it
 - null - just enable the form
*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './WrestlerForm.css';

// step 1 to convert this into a redux container component...
// import the 'connect'
import { connect } from 'react-redux';
import * as actions from '../actions';

class WrestlerForm extends Component {

  /**
   * Returns an object replicating the default initial state of the app
   * @return {Object} an object containing all default properties
   **/
  getInitialFormStateObject() {
    return {
      title: '',
      description: '',
      moves: [],
      finishers: [],
      facts: []
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const newWrestler = Object.assign({}, this.state);
    // let itemsRef;

    if (this.props.editingWrestler) {
      // dispatch an update wrestler event
      // itemsRef = firebase.database().ref(`/wrestlers/${this.state.editingWrestler}`);
      // itemsRef.update(item);
      this.props.updateWrestler({
        ...newWrestler,
        id: this.props.editingWrestler.id
      });
    } else {
      // displatch an add wrestler event
      this.props.saveWrestler(newWrestler);
    }
  }

  handleChange(e) {
    let stateChangeObject = {};
    stateChangeObject[e.target.name] = e.target.value;

    this.setState(stateChangeObject);
  }

  handleChangeForList(e, separator=',') {
    let stateChangeObject = {};
    stateChangeObject[e.target.name] = e.target.value.split(separator);

    this.setState(stateChangeObject);
  }

  constructor(props) {
    super(props);

    if (props.editingWrestler) {
      this.state = {
        title: props.editingWrestler.title,
        description: props.editingWrestler.description,
        moves: props.editingWrestler.moves,
        finishers: props.editingWrestler.finishers,
        facts: props.editingWrestler.facts
      };
    } else {
      this.state = this.getInitialFormStateObject();
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeForList = this.handleChangeForList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // in here, the form will be filled
    // if the editingWrestler changes
    if (nextProps.editingWrestler &&
      (!this.props.editingWrestler || this.props.editingWrestler.id !== nextProps.editingWrestler.id)
    ) {
      // set the state to be the same as the wrestler

      const editingWrestler = nextProps.editingWrestler;

      this.setState({
        title: editingWrestler.title,
        description: editingWrestler.description,
        moves: editingWrestler.moves,
        finishers: editingWrestler.finishers,
        facts: editingWrestler.facts
      });
    } else if (!nextProps.editingWrestler && this.props.editingWrestler) {
      // we changed from editing to adding a wrestler
      // it might've been toggled by button press
      // or via form submission
      this.setState(this.getInitialFormStateObject());
    }
  }

  render() {
    return (
      <section className={styles['wrestler-form']}>
          <header className={styles['wrestler-form__header']}>
            {this.props.editingWrestler ? 'Edit Wrestler' : 'Add New Wrestler'}
          </header>
          <form className={styles['wrestler-form__content']} onSubmit={this.handleSubmit}>
            <input className={styles['wrestler-form__input']} type="text" name="title" placeholder="Wrestler name" onChange={this.handleChange} value={this.state.title} />
            <input className={styles['wrestler-form__input']} type="text" name="description" placeholder="Wrestler description" onChange={this.handleChange} value={this.state.description} />
            <input className={styles['wrestler-form__input']} type="text" name="moves" placeholder="Wrestler moves (separated by comma, no space)" onChange={this.handleChangeForList} value={this.state.moves.join(',')} />
            <input className={styles['wrestler-form__input']} type="text" name="finishers" placeholder="Wrestler finishing moves (separated by comma, no space)" onChange={this.handleChangeForList} value={this.state.finishers.join(',')} />
            <input className={styles['wrestler-form__input']} type="text" name="facts" placeholder="Wrestler facts (separated by comma, no space)" onChange={this.handleChangeForList} value={this.state.facts.join(',')} />
            <button className={styles['wrestler-form__button']}>
              {this.props.editingWrestler ? 'Edit' : 'Add'}
            </button>
          </form>
      </section>
    );
  }
}

WrestlerForm.propTypes = {
  // used for existing wrestlers
  saveWrestler: PropTypes.func.isRequired,
  updateWrestler: PropTypes.func.isRequired,
  editingWrestler: PropTypes.object
}

export default connect(function mapStateToProps(state) {
  return {
    editingWrestler: state.wrestlers.editingWrestler,
    wrestlerSubmissionStatus: state.wrestlers.wrestlerSubmissionStatus
  };
}, {
  saveWrestler: actions.saveWrestler,
  updateWrestler: actions.updateWrestler
})(WrestlerForm);
