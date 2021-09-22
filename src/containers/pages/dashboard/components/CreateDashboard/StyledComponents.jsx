import styled from 'styled-components';
import DotsImg from '../../../../../assets/svgIcon/dashboard/Dots.svg';
import { Colors } from '../../../../../theme';

export const CreateDashboardContainer = styled.div`
  .dnd-container {
    background-image: url(${DotsImg});
    height: 94%;
    /* overflow: auto; */
  }

  .remove-widget-icon{
    position:absolute;
    right:5px;
    top:5px;
    color:#FFF;
    cursor:pointer;
  }

  .react-grid-item:hover > .remove-widget-icon{
    opacity:1
  }

  .widget-layout{
    min-height: 100vh;
  }

  .react-grid-item > .remove-widget-icon{
    opacity:0
  }

  .resize-container {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    resize: both;
    overflow: hidden;
  }

  .resize-container[data-width-range='large'] {
    opacity: 0.5;
    color: white;
  }

  .resize-container[data-width-range='small'] {
    opacity: 0.9;
  }

  .resize-container[data-height-range='large'] {
    background-color: #546e7a;
  }

  .resize-container[data-height-range='small'] {
    background-color: #d7dfe2;
  }

  .App {
    font-family: sans-serif;
    text-align: center;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #1d1c1f;
    font-family: sans-serif;
    font-size: 14px;
  }

  h1,
  h2,
  h4 {
    color: white;
  }

  .container {
    width: 100%;
    position: relative;

    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
  }

  .card-wrapper {
    position: relative;
  }

  .card {
    border: 3px solid transparent;
    border-radius: 5px;
    overflow: hidden;
  }

  .card-dragged {
    position: absolute;
    transform-origin: bottom left;
    -webkit-backface-visibility: hidden;
  }

  .card-wrapper-active:not(.card-wrapper-dragging) .card {
    border: 3px solid #4e56ff;
  }

  .card-outer {
    border: 2px solid transparent;
    border-radius: 2px;
    overflow: hidden;
  }

  .card-wrapper-selected:not(.card-wrapper-dragging) .card-outer {
    border: 2px solid orange;
  }

  .card-inner {
    position: relative;
    background-color: rgba(255, 255, 255, 0.05);
    color: #aaa;
    font-weight: bold;
    font-size: 24px;
    display: flex;
    flex-direction: column;
  }

  .card-dragged .card-inner {
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.35);
  }

  .card-wrapper-dragging .card-inner {
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .card-wrapper-dragging.card-wrapper-hovered .card-inner {
    border: 2px solid orange;
    border-radius: 2px;
    background-color: transparent;
  }

  .card-wrapper-dragging .card-inner img {
    opacity: 0;
  }

  .insert-line-left,
  .insert-line-right {
    position: absolute;
    top: 0;
    left: -1px;
    height: 100%;
    width: 2px;
    background-color: orange;
  }

  .insert-line-right {
    left: auto;
    right: -1px;
  }
`;

export const AddWidgetContainer = styled.div`
  padding: 20px;
  background: #2c2c38;
  height: 100%;
  overflow:auto;
  .title {
    font-weight: bold;
    font-size: 18px;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  }
  .sc-jgHCyG.kkchKd {
    background: #fff;
    margin-bottom: 20px;
  }
  .widgets-list {
    .heading {
      font-weight: bold;
      font-size: 15px;
      color: #bdbdbd;
      overflow:auto;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .widget-inner-container{
      max-height:105vh;
      overflow:auto;
    }
    .widget-data-container {
      background: #1c1c24;
      border: 1px solid #444444;
      box-sizing: border-box;
      border-radius: 10px;
      padding: 10px;
      margin: 5px 0;
      &:hover {
        .add-ons {
          button {
            opacity: 1;
          }
        }
      }
      .widget-title {
        font-size: 13px;
        color: #ffffff;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }

      .add-ons {
        display: flex;
        align-items: center;
        .analysis-img {
          margin-right: 10px;
        }
        button {
          width: 70px;
          opacity: 0;
          margin-left: auto;
        }
      }
    }
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  p {
    margin-bottom: 0;
    font-weight: bold;
    font-size: 20px;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  }
  img {
    height: 20px;
    width: 20px;
    margin-left: 30px;
    margin-right: 30px;
  }
  button {
    width: 150px;
    margin-right: 30px;
  }
  .sc-gsxnyZ.iVaZTA {
    margin-bottom: 0;
  }
`;

export const WidgetSelect = styled.div`
  margin-top: 10px;
`;
export const ActiveDashboardSelect = styled.div`
  margin-top: 25px;
`;

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.transparent};
  border: none;
  outline: none;
  cursor: pointer;
  height: 25px;
  width: 25px !important;
  border-radius: 4px;
  margin: 0px 5px 0px 2px !important;

  &:hover {
    background-color: ${Colors.backgroundGray};
  }
`;