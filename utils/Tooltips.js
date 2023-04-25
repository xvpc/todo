import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default function Tooltips({ children, text = '', placement = 'top' }) {
    return (
        <OverlayTrigger
        placement={placement}
        overlay={<Tooltip id={`tooltip-${placement}`}>{text}</Tooltip>}
        >
        {children}
        </OverlayTrigger>
    )
}