import React, { Component } from 'react';
import NavigationIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import PropTypes from 'prop-types';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/**
 */
export class ViewerNavigation extends Component {
  /**
   */
  constructor(props) {
    super(props);

    this.nextCanvas = this.nextCanvas.bind(this);
    this.previousCanvas = this.previousCanvas.bind(this);
  }

  /**
   */
  nextCanvas() {
    const { window, canvasIndex, setCanvas } = this.props;
    if (this.hasNextCanvas()) {
      setCanvas(window.id, canvasIndex + this.canvasIncrementor());
    }
  }

  /**
   */
  hasNextCanvas() {
    const { canvasIndex, canvases } = this.props;
    return canvasIndex < canvases.length - this.canvasIncrementor();
  }

  /**
   */
  previousCanvas() {
    const { window, canvasIndex, setCanvas } = this.props;
    if (this.hasPreviousCanvas()) {
      setCanvas(window.id, Math.max(0, canvasIndex - this.canvasIncrementor()));
    }
  }

  /**
   */
  hasPreviousCanvas() {
    const { canvasIndex } = this.props;
    return canvasIndex > 0;
  }

  /**
   */
  canvasIncrementor() {
    const { window } = this.props;
    switch (window.view) {
      case 'book':
        return 2;
      default:
        return 1;
    }
  }

  /**
   * Renders things
   */
  render() {
    const { t } = this.props;

    return (
      <div className={ns('osd-navigation')}>
        <MiradorMenuButton
          aria-label={t('previousCanvas')}
          className={ns('previous-canvas-button')}
          disabled={!this.hasPreviousCanvas()}
          onClick={this.previousCanvas}
        >
          <NavigationIcon style={{ transform: 'rotate(180deg)' }} />
        </MiradorMenuButton>
        <MiradorMenuButton
          aria-label={t('nextCanvas')}
          className={ns('next-canvas-button')}
          disabled={!this.hasNextCanvas()}
          onClick={this.nextCanvas}
        >
          <NavigationIcon />
        </MiradorMenuButton>
      </div>
    );
  }
}

ViewerNavigation.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  canvasIndex: PropTypes.number.isRequired,
  setCanvas: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
