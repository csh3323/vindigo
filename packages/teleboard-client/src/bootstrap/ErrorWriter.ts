/**
 * The Error Writer is used to render important
 * core exceptions to the HTML document.
 */
export class ErrorWriter {

    private error: Error;

    constructor(error: Error) {
        this.error = error;
    }

    private generateHeader() : string {
        const errName = this.error.name;

        return `
        <div style="background-color: #eb4d4b; padding: 16px; color: white; font-size: 1.55em">
            <b>Error:</b> Failed to launch Teleboard (${errName})
        </div>
        `;
    }

    private generateStack() : string {
        let stackTrace = this.error.stack;
        let message = this.error.message || 'No additional details';

        if(!stackTrace) {
            stackTrace = "Please see console for details";
        }

        return `
        <div style="background-color: #ecf0f1; padding: 16px;">
            <div style="margin-bottom: 16px">
                <strong>${message}</strong>
            </div>
            <pre style="padding-left: 16px">${stackTrace}</pre>
            <div style="margin-top: 16px">
                In case this error is unexpected, feel free to report it to our
                <a href="https://github.com/ExodiusStudios/teleboard/issues">GitHub issue tracker</a>.
            </div>
        </div>
        `;
    }

    private generateContent() : string {
        return `
        <div style="font-family: Roboto;">
            ${this.generateHeader()}
            ${this.generateStack()}
        </div>
        `;
    }

    /**
     * Write the exception to the document
     */
    public write() {
        const content = this.generateContent();

        document.write(content);
        console.error(this.error);
    }

}