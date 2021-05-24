import { google } from "googleapis";
import dotenv from "dotenv";
import twilio from "twilio";
const { getSummary } = require('./googleapi');
dotenv.config();

const {
  SID: accountSid,
  KEY: TwilloAuthToken,
  APIKEY: googleApiKey,
  CX: cx,
} = process.env;

twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const customsearch = google.customsearch("v1");

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */
class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */

  static async walkamoleSpeak(req, res, next) {
    const twiml = new MessagingResponse();
    console.log(req);
    const body = req.body.Body;
    // const senderName = 
    console.log(body);

    if(/help/.test(body)){

    }

    getSummary().then(result => {
      twiml.message(`${result}`);
      res.set("Content-Type", "text/xml");
      return res.status(200).send(twiml.toString());
    }).catch(error => {
      console.log(error);
    });
  }

  static standardResponse() {
    let response = "Welcome to the Holy Walkamole Whatsapp Bot \n";
    response += "You can view the daily stats and submit your daily walking distance using this bot. \n"
    response += "If you have any questions, you can reach out to the administrators on the whatsapp group. \n"
    return response;
  }

  static async walkamoleDistance(req, res, next) {
    const twiml = new MessagingResponse();
    const q = req.body.Body;
    const options = { cx, q, auth: googleApiKey };
    console.log(req);
    if (q.match(/(\d+).?(\d*)\s*(miles|km)/)) {
      const distance = q.match(/(\d+).?(\d*)/);
      const metric = q.match(/\s*(miles|km)/).trim();
      switch (metric) {
        case "miles":
        case "mile":
        case "Mile":
        case "Miles":
        case "M":
        case "m":
          distance *= 1.6;
          break;
        case "":
        case " ":
        case "km":
        case "KM":
        case "kilometer":
        case "Km":
        default:
          break;
      }
      //TODO: The method that writes to the Google Sheets
      twiml.message(
        ` You're amazing!! Your distance of ${distance} km for today has been recorded. Thank you for walking and helping reach the goal! Stay Healthy and Stay Safe!`
      );
      res.set("Content-Type", "text/xml");
      return res.status(200).send(twiml.toString());
    } else if (q === "summary" || q === " Summary") {
      const summaryString = this.getSummaryString();
      twiml.message(`${summaryString}`);
      res.set("Content-Type", "text-xml");
      return res.status(200).send(twiml.toString());
    } else {
      twiml.message(
        `Please submit distance in the following format '1.6 km' or '1.6 miles' or '4 Km' or '4 Miles'`
      );
      res.set("Content-Type", "text/xml");
      return res.status(200).send(twiml.toString());
    }
  }

  static async fscZoomLinks(req, res, next) {
    const qArray = q.split(" ");
    let responseMessage = "";

    if (
      qArray.includes("bhajans") ||
      qArray.includes("bhajan") ||
      qArray.includes("Bhajans") ||
      qArray.includes("Bhajan")
    ) {
      twiml.message(
        `Sairam! Please use this zoom url for the upcoming bhajan: https://zoom.us/fsb-bhajans`
      );
      res.set("Content-Type", "text/xml");
      return res.status(200).send(twiml.toString());
    } else {
      twiml.message(
        `Sairam! We currently don't serve this through whatsapp, please check our website https://fremontsaicenter.org`
      );
      res.set("Content-Type", "text/xml");
      return res.status(200).send(twiml.toString());
    }
  }
}

export default WhatsappBot;
