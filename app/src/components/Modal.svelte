<script lang="ts">
    export let open = false;
    function toggle(shouldClose: any) {
        if (shouldClose) {
            open = !open;
        }
    }
</script>

<div class="modal-overlay" class:open on:click={(e) => toggle(e.target.classList.contains('close-button'))}>
    <div class="modal" class:open>
        <button class="close-button" on:click={(e) => {e.stopPropagation(); toggle(true)}}>X</button>
        <slot></slot>
    </div>
</div>

<style>
    .modal-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s linear 0.25s, opacity 0.25s linear;
    }

    .modal-overlay.open {
        visibility: visible;
        opacity: 1;
        transition-delay: 0s;
    }

    .modal {
        background-color: #1c1c1c;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        visibility: hidden;
        opacity: 0;
        transform: scale(1.1);
        transition: visibility 0s linear 0.25s, opacity 0.25s linear, transform 0.25s linear;
    }

    .modal.open {
        visibility: visible;
        opacity: 1;
        transform: scale(1);
        transition-delay: 0s;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 25px;
        background-color: transparent;
        border: 0;
        color: #667085;
        cursor: pointer;
    }
</style>